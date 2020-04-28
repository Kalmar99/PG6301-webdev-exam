import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

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
            <Container>
                <Row>
                    <Col>{this.state.error && <Alert variant="danger" >{this.state.error.toString()}</Alert>}</Col>
                </Row>
                <Row>
                    {this.state.pokemon != null && <Container>
                        <Row>
                            <Col><h1>{this.state.pokemon.name}</h1></Col>
                        </Row>
                        <Row>
                            <Col><img src={this.state.pokemon.img}></img></Col>
                        </Row>
                        <Row>
                            <Col><b>{this.state.pokemon.type}</b></Col>
                        </Row>
                        <Row>
                            <Col><p>{this.state.pokemon.description}</p></Col>
                        </Row>
                    </Container>}
                </Row>
            </Container>
        )
    }
}