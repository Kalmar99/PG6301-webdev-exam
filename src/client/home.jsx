import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
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
        
        this.setState({pokemon: payload,error: null})
        return;
        
    }
    
    
    render() {
        
        return (
            <Container className="page mt-3 h-100">
                <Row className="mb-3">
                    <Header  setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Col>{this.props.username && <Alert variant="success ">Welcome {this.props.username}. Head over to my collection to open your first pokeball!</Alert>} </Col>
                </Row>
                <Row>
                    <Col>{this.state.error != null && <p>{this.state.error.toString()}</p>}</Col>
                </Row>
                <Row className="mt-2">
                    <Container>
                        <Row>
                            <Col className="ml-3">Welcome to catch'em all{this.props.username && <b>{" " + this.props.username}</b>}! This game is all about opening pokeballs to gain new pokemon. {!this.props.username && <p>If you dont have an account you can register <Link to="/register">here</Link></p>  }</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="ml-3"><h3>All pokemons</h3></Col>
                        </Row>
                        <Row className="pokemon-collection">
                            {this.state.pokemon.map(pokemon => <Col className="collection-item mt-2" lg={2}  key={pokemon.id + pokemon.name}> <Link to={'/pokemon?n='+pokemon.name}>
                                <Col lg={12}><img src={pokemon.img} className="img-fluid"></img></Col>
                                <Col className="text-center"><b>{pokemon.name}</b></Col>
                                <Col lg={7} className={" mx-auto text-center type " + pokemon.type.toLowerCase()}>{pokemon.type}</Col>
                            </Link> </Col>)}
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}