import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'


import Table from 'react-bootstrap/Table'


 
import {Header} from './header'

export class Shop extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            username: null,
            lootboxes: []
        }
    }

    componentDidMount() {

        this.fetchLootBoxes()
    }

    buyLootBox = async (name) => {
        let response;

        try {
            response = await fetch('/api/lootboxes/' + name,{method: 'POST'})
        } catch(error) {
            this.setState({error})
            return;
        }

        if(response.status === 404) {
            this.setState({error: '404 Cant find that lootbox'})
            return;
        }

        if(response.status === 403) {
            this.setState({error: 'You dont have enough coins to buy that'})
            return;
        }

        if(response.status === 401) {
            this.setState({error: 'You need to be logged in to do that'})
            this.props.setLoginStatus(false)
            return;
        }

        if(response.status !== 204) {
            this.setState({error: 'Something went wrong, code: ' + response.status })
            return;
        }

        this.props.history.push('/collection')
    }

    fetchLootBoxes = async () => {
        
        let response;
        let payload;

        try {
            response = await fetch('/api/lootboxes')
            payload = await response.json()
        } catch(error) {
            this.setState({error: 'Error connecting to server: ' + error})
            return;
        }

        if(response.status == 500) {
            this.setState({error: '500 Internal server error'})
            return;
        }

        if(response.status !== 200) {
            this.setState({error: 'Cant GET lootboxes, code: ' + response.status})
            return;
        }

        this.setState({lootboxes: payload,error: null})
        return;
    }

    renderIfLoggedIn = () => {
        return (
            <Container className="page h-100">
                    <Row>
                        <Col><h2>Loot table</h2></Col>
                    </Row>
                    <Row>
                        <Col className="m-2 loot-table">
                            <Row className="gray-row">
                                <Col lg={2} className="my-auto" ><img className="img-fluid" src="./img/pokeballs/pokeball.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/pikachu.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/charmander.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/squirtle.png"></img></Col>
                            </Row>
                            <Row>
                                <Col lg={2} className="my-auto" ><img className="img-fluid" src="./img/pokeballs/greatball.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/caterpie.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/rattata.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/nidorina.png"></img></Col>
                            </Row>
                            <Row className="gray-row">
                                <Col lg={2} className="my-auto" ><img className="img-fluid" src="./img/pokeballs/ultraball.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/blastoise.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/ninetales.png"></img></Col>
                                <Col lg={1} className="my-auto"><img className="img-fluid" src="./img/persian.png"></img></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                        <Col><h2>Pokeballs</h2></Col>
                    </Row>
                    <Row className="mt-2">
                        {this.state.lootboxes.length >= 1 && this.state.lootboxes.map((lootbox) => <Col className="poke-ball" key={lootbox.name} lg={2}>
                            <Col><img className="img-fluid" src={lootbox.img}></img></Col>
                            <Col><b>{lootbox.name}</b></Col>
                            <Col>Cost: <p>{lootbox.cost} Coins</p></Col>
                            <Col><button className={"btn"+lootbox.name} onClick={() => {this.buyLootBox(lootbox.name)}}>Buy</button></Col>
                        </Col>)}
                    </Row>
                </Container>
        )
    }

    renderIfLoggedOut = () => {
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

        let page

        if(!this.props.username) {
            page = this.renderIfLoggedOut();
        } else { 
            page = this.renderIfLoggedIn();
        }
        
        return (
            <Container className="page h-100 mt-3">
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <Alert variant="danger">{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row>
                    {page}
                </Row>
            </Container>
        )
    }
}