import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
import {Header} from './header'

export class Home extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            pokemon: [],
            error: null
        }
    }

    componentDidMount() {
        this.fetchPokemon()
    }

    fetchPokemon = async () => {

        let response;
        let payload;
        try {
            response = await fetch('/api/pokemons')
            payload = await response.json()
        } catch (error) {
            this.setState({error})
            return;
        }

        if(response.status == 404) {
            this.setState({error: 'Cant fetch pokemon 404 not found'})
            return;
        }

        if(response.status != 200) {
            this.setState({error: 'failed to fetch pokemon, code: ' + response.status})
            return;
        }
        console.log(payload)
        this.setState({pokemon: payload,error: null})
        return;
        
    }
    
    
    render() {
        console.log(this.props.username)
        return (
            <Container>
                <Row>
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <p>{this.state.error.toString()}</p>}</Col>
                </Row>
                <Row>
                    <Container>
                        <Row>
                            {this.props.username != null && <p> Welcome: {this.props.username}</p>}
                        </Row>
                        <Row>
                            <Col><h3>Catch them all!</h3></Col>
                        </Row>
                        <Row>
                            {this.state.pokemon.map(pokemon => <Col key={pokemon.id} lg={2}>
                                <Col lg={12}><img src={pokemon.img} className="img-fluid"></img></Col>
                                <Col><b>{pokemon.name}</b></Col>
                                <Col>{pokemon.type}</Col>
                            </Col>)}
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}