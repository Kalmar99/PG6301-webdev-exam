import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
 
import {Header} from './header'

export class Shop extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            error: null,
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

    render() {
        return (
            <Container className="page h-100 mt-3">
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <Alert variant="danger">{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row className="mt-2 mb-2">
                    <Col><h2>Pokeballs</h2></Col>
                </Row>
                <Row className="mt-2">
                    {this.state.lootboxes.length >= 1 && this.state.lootboxes.map((lootbox) => <Col lg={2}>
                        <Col><img className="img-fluid" src={lootbox.img}></img></Col>
                        <Col><b>{lootbox.name}</b></Col>
                        <Col>Cost: <p>{lootbox.cost} Coins</p></Col>
                        <Col><button onClick={() => {this.buyLootBox(lootbox.name)}}>Buy</button></Col>
                    </Col>)}
                </Row>
            </Container>
        )
    }
}