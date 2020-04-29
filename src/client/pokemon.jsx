import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import {Header} from './header'

export class Pokemon extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            pokemon: null,
            error: null
        }
    }

    componentDidMount() {
        const name = new URLSearchParams(window.location.search).get('n')
        this.fetchPokemon(name);
    }

    fetchPokemon = async (name) => {
        
        let response;
        let payload;
        
        try {
            response = await fetch('/api/pokemons/' + name)
            payload = await response.json()
        } catch(error) {
            this.setState({error: 'Error connection to server: ' + error})
            return;
        }

        if(response.status == 404) {
            this.setState({error: '404 the pokemon you are trying to acess does not exist'})
            return;
        }

        if(response.status != 200) {
            this.setState({error: 'Something went wrong, code: ' + response.status})
            return;
        }

        this.setState({pokemon: payload,error: null})
        return;
    }

    render() {
        return (
            <Container className="page mt-3 h-100">
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error && <Alert variant="danger" >{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row className="mt-3">
                    {this.state.pokemon != null && <Container className="mt-3 pokemon">
                        <Row className="justify-content-center mt-3">
                            <Col lg={2}><img className="img-fluid" src={this.state.pokemon.img}></img></Col>
                            <Col lg={6}>
                                <Container>
                                    <Row>
                                        <Col><h3>{this.state.pokemon.name}</h3></Col>
                                    </Row>
                                    <Row>
                                        <Col lg={2} className={"ml-3 text-center type " + this.state.pokemon.type.toLowerCase()}>{this.state.pokemon.type}</Col>
                                    </Row>
                                    <Row>
                                        <Col><p>{this.state.pokemon.description}</p></Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row> 
                    </Container>}
                </Row>
            </Container>
        )
    }
}