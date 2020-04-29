import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

import Modal from 'react-bootstrap/Modal'
 
import {Header} from './header'
import Button from 'react-bootstrap/button'


export class Collection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            username: null,
            collection: [],
            loot: [],
            won: {},
            show: false

        }
    }

    componentDidMount() {
        this.props.fetchUser((payload) => {
            this.setState({username: payload.username})
            this.fetchUserCollection()
            this.fetchUserLootboxes()
        })
    }

    fetchUserLootboxes = async () => {
        let response;
        let payload;
        console.log(this.props.username)
        try {
            response = await fetch('/api/user/' + this.props.username +'/lootboxes')
            payload = await response.json()
        } catch(error) {
            this.setState({error})
            return;
        }

        if(response.status === 404) {
            this.setState({error: '404 cant find the user'})
            return;
        }

        if(response.status === 401) {
            this.props.setLoginStatus(false)
            this.setState({error: 'you need to be logged in to see this'})
            return;
        }

        if(response.status != 200) {
            this.setState({error: 'Something went wrong, code:' + response.status})
            return;
        }

        this.setState({loot: payload,error: null})
        return;
    }
 
    fetchUserCollection = async () => {
        
        let response;
        let payload;

        try {
            response = await fetch('/api/user/' + this.props.username + '/collection');
            if(response.status == 200) {
                payload = await response.json()
            }
        } catch(error) {
            this.setState({error})
            return;
        }

        if(response.status === 401) {
            this.props.setLoginStatus(false)
            this.setState({error: 'you need to be logged in to view this page'})
            return;
        }

        if(response.status !== 200) {
            this.setState({error: 'Something went wrong, code: ' + response.status})
            return;
        }

        this.setState({collection: payload.collection,error: null})
        return;
    }

    millPokeMon = async (pokemon) => {

        let response;
        try {
            response = await fetch('/api/user/' + this.props.username + '/collection/' + pokemon ,{
                method: 'DELETE'
            })
        } catch(error) {
            this.setState({error: 'Cant connect to server: ' + error})
            return;
        }

        if(response.status === 401) {
            this.setState({error: 'You are not allowed to do that'})
            return;
        }

        if(response.status === 404) {
            this.setState({error: 'Cant find the user or pokemon you are refering to'})
            return;
        }

        if(response.status !== 204) {
            this.setState({error: 'Something went wrong, code:' + response.status})
            return;
        }

        //update the collection
        this.fetchUserCollection()
    }

    openLootBox = async (lootbox) => {
        let response;
        let payload;

        try {
            response = await fetch('/api/user/'+ this.state.username +'/lootboxes/' + lootbox,{method: 'POST'})
            payload = await response.json()
        } catch(error) {
            this.setState({error})
            return;
        }


        if(response.status == 401) {
            this.setState({error: 'You need to be logged in to do that!'})
            this.props.setLoginStatus(false)
            return;
        }

        if(response.status == 403) {
            this.setState({error: 'You are not allowed to open that!'})
            return;
        }

        if(response.status === 404) {
            this.setState({error: '404 Cant find the resource you requested'})
            return;
        }

        if(response.status != 201) {
            this.setState({error: 'Something went wrong, code:' + response.status})
            return;
        }
        
        
        this.setState({won: payload,show: true})
        //Refresh lootboxes
        this.fetchUserLootboxes()

    }

    renderIfLoggedIn = () => {
        return (
        <Container className="page h-100">
                <Row>
                    <Col>{this.state.error != null && <Alert variant="danger">{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row className="mt-2">
                   <Col><p>This is your collection, here you can open pokeballs if you have any. You can also mill your pokemon to get more coins.</p></Col>
                </Row>
                <Row className="mt-2">
                    <Col className=" ml-1 mr-1 collection-header"><h3>Lootboxes</h3></Col>
                </Row>
                <Row className="mt-2">
                    {this.state.loot.length >= 1 && this.state.loot.map((loot) => <Col className="loot" lg={2}>
                        <Col><img className="img-fluid" src={loot.img}></img></Col>
                        <Col><b>{loot.count}x {loot.name}</b></Col>
                        <Col><button onClick={() => {this.openLootBox(loot.name)}}>Open</button></Col>
                    </Col>)}
                </Row>
                <Row className="mt-3">
                    <Col className=" ml-1 mr-1 collection-header"><h3>Pokemon</h3></Col>
                </Row>
                {this.state.collection.length >= 1 &&  <Row className="collection poke-collection">
                    {this.state.collection.map((pokemon) => <Col className="collection-pokemon" lg={2} key={pokemon.name}>
                        <Col><img className="img-fluid" src={pokemon.img}></img></Col>
                        <Col className="text-center"><b>{pokemon.count}x {pokemon.name}</b></Col>
                        <Col lg={7} className={" mx-auto text-center type " + pokemon.type.toLowerCase()}>{pokemon.type}</Col>
                        <Col className="mt-1 text-center"><button className="w-75 mill-btn" onClick={() => this.millPokeMon(pokemon.name)}>Mill</button></Col>
                    </Col>)}
                </Row>}
            </Container>)
    }

    handleCloseModal = () => {
        this.setState({show: false, won: {}})
        //update collection
        this.fetchUserCollection()
    }

    renderIfNotLoggedIn = () => {
        return(
            <Container className="page h-100 mt-3">
                <Row>
                    <Col><h3>You need to be logged in to see this page!</h3></Col>
                </Row>
                <Row>
                    <Col><Link to="/login">Log in</Link></Col>
                </Row>
            </Container>)
    }

    render() {

        let page;
        

        if(!this.state.username) {
            page = this.renderIfNotLoggedIn()
        } else {
            page = this.renderIfLoggedIn()
        }

      
        return (
           <Container className="page h-100 mt-3"> 
            <Row>
                <Header  setLoginStatus={this.props.setLoginStatus} trigger={this.state.trigger} username={this.props.username}></Header>
            </Row>
            <Row>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>You got a {this.state.won.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col><img src={this.state.won.img}></img></Col>
                        <Col><b>{this.state.won.type}</b></Col>
                        <Col><p>{this.state.won.description}</p></Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                {page}
            </Row>
           </Container>
        )
    }
}