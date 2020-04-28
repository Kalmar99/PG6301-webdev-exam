import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Header} from './header'
import {Link} from 'react-router-dom'

export class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null
        }
    }

    onChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    login = async () => {

        let response;

        const user = {username: this.state.username, password: this.state.password}

        try {
            response = await fetch('/api/login',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
        } catch(error) {
            this.setState({error})
            return;
        }

        if(response.status === 401 ) {
            this.setState({error: 'Invalid username or password'})
            return;
        }

        if(response.status !== 204) {
            this.setState({error: 'Something went wrong, code: ' + response.status})
            return;
        }

        this.setState({error: null})
        this.props.setLoginStatus(this.state.username)
        this.props.history.push('/')
        return;

    }

    render() {
        return (
            <Container className="page mt-3 h-100">
                <Row>
                    <Header setLoginStatus={this.props.setLoginStatus} username={this.props.username}></Header>
                </Row>
                <Row>
                    <Container className="mt-3">
                        <Row>
                            <Col><h2>Log in</h2></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col><input onChange={this.onChangeUsername} placeholder='Username' type="text" /></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col><input onChange={this.onChangePassword} placeholder="Password" type="password" /></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col><button onClick={this.login}>Log In</button></Col>
                        </Row>
                        <Row>
                            <Col><p>Dont have an account? <Link to="/register">Register here</Link></p></Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}