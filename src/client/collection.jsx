import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
 
import {Header} from './header'


export class Collection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            username: null,
            collection: [],
            loot: [],
            trigger: false
        }
    }

    componentWillReceiveProps(props) {
        console.log("recieved props")
        this.setState({username: props.username})
    }

    componentDidMount() {
        this.fetchUserCollection()
        this.fetchUserLootboxes()
    }

    fetchUserLootboxes = async () => {
        let response;
        let payload;

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
            response = await fetch('/api/user/' + this.state.username + '/collection');
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
            this.setState({error: 'Somethin went wrong, code: ' + response.status})
            return;
        }
        console.log(payload)
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


    render() {
        return (
            <Container className="page h-100 mt-3">
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} trigger={this.state.trigger} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <Alert variant="danger">{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row>
                    <Col><h3>Lootboxes</h3></Col>
                </Row>
                <Row>
                    {this.state.loot.length >= 1 && this.state.loot.map((loot) => <Col lg={2}>
                        <Col><img className="img-fluid" src={loot.img}></img></Col>
                        <Col><b>{loot.count}x {loot.name}</b></Col>
                        <Col><button>Open</button></Col>
                    </Col>)}
                </Row>
                <Row>
                    <Col><h3>Pokemon</h3></Col>
                </Row>
                <Row>
                    {this.state.collection.length >= 1 && this.state.collection.map((pokemon) => <Col lg={2} key={pokemon.name}>
                        <Col><img className="img-fluid" src={pokemon.img}></img></Col>
                        <Col><b>{pokemon.count}x {pokemon.name}</b></Col>
                        <Col><p>{pokemon.type}</p></Col>
                        <Col><button onClick={() => this.millPokeMon(pokemon.name)}>Mill</button></Col>
                    </Col>)}
                </Row>
            </Container>
        )
    }
}