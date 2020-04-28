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
            collection: []
        }
    }

    componentDidMount() {
        this.fetchUserCollection()
    }
 
    fetchUserCollection = async () => {
        
        let response;
        let payload;

        try {
            response = await fetch('/api/user/collection');
            payload = await response.json()
        } catch(error) {
            this.setState({error})
            return;
        }

        if(response.status === 401) {
            this.props.setLoginStatus(false)
            this.setState({error: 'you need to be logged in to do that!'})
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


    render() {
        return (
            <Container>
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <Alert variant="danger">{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row>
                    {this.state.collection.length >= 1 && this.state.collection.map((pokemon) => <Col lg={2} key={pokemon.name}>
                        <Col><img className="img-fluid" src={pokemon.img}></img></Col>
                        <Col><b>{pokemon.name}</b></Col>
                        <Col><p>{pokemon.type}</p></Col>
                        <Col><p>Amount: {pokemon.count}</p></Col>
                    </Col>)}
                </Row>
            </Container>
        )
    }
}