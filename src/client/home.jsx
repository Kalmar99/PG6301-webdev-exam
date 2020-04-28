import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
 
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

        if(response.status == 500) {
            this.setState({error: '500 Internal server error'})
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
            <Container className="page mt-3 h-100">
                <Row className="mb-3">
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <p>{this.state.error.toString()}</p>}</Col>
                </Row>
                <Row className="mt-2">
                    <Container>
                        <Row className="mb-3">
                            <Col><h3>All pokemons</h3></Col>
                        </Row>
                        <Row className="pokemon-collection">
                            {this.state.pokemon.map(pokemon => <Col className="collection-item" lg={2}  key={pokemon.id}> <Link to={'/pokemon?n='+pokemon.name}>
                                <Col lg={12}><img src={pokemon.img} className="img-fluid"></img></Col>
                                <Col><b>{pokemon.name}</b></Col>
                                <Col>{pokemon.type}</Col>
                            </Link> </Col>)}
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}