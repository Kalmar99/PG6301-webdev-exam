import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {Link} from 'react-router-dom'

export class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            user: null
        }
    }

    componentWillMount() {
        this.fetchUser()
    }

    fetchUser = async () => {
        let response; 
        let payload;
        
        try {
            response = await fetch('/api/user')
            payload = await response.json()
        } catch(error) {
            this.setState({error})
        }

        if(response.status == 401) {
            this.setState({error: 'You are not logged in',username: null,user: null})
            this.props.setLoginStatus(false)
            return;
        }

        if(response.status !== 200) {
            this.setState({error: 'Something went wrong, code: ' + response.status,username: null,user: null})
            this.props.setLoginStatus(false)
            return;
        }
        
        this.setState({user: payload,error: null})
        this.props.setLoginStatus(payload.username)
        return;
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col lg={3}><h1>Catch'em All</h1></Col>
                    <Col lg={1}><Link to="/">Home</Link></Col>
                    {this.props.username ? <Col lg={2}><Link to="/collection">My Collection</Link></Col> : <Col lg={1}><Link to="/login">Log In</Link></Col>}
                </Row>
                
                {this.state.user !== null && <Row>
                    <Col lg={3}>Username: {this.state.user.username}</Col>
                    <Col lg={3}>Coins: {this.state.user.coins}</Col>
                </Row>}
            </Container>
        )
    }
}