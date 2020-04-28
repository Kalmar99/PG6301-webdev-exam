import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

export class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            passwordConfirm: null,
            error: null
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onPasswordConfirmChange = (event) => {
        this.setState({passwordConfirm: event.target.value})
    }

    register = async () => {
        
        if(this.state.password !== this.state.passwordConfirm) {
            this.setState({error: 'Passwords doesent match!'})
            return;
        }
        let response;
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        try {
            response = await fetch('/api/signup',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
        } catch(error) {
            this.setState({error: 'Cant connect to server: ' + error})
            return;
        }

        if(response.status === 400) {
            this.setState({error: 'Invalid username / password'})
            return;
        }

        if(response.status !== 201) {
            this.setState({error: 'Something went wrong, code: ' + response.status})
            return;
        }

        this.setState({error: null})
        this.props.setLoginStatus(this.state.username)
        this.props.history.push('/')
    }

    render() {
        return (
            <Container>
                <Row>
                    <Container>
                        <Row>
                            {this.state.error != null && <Col>
                                <Alert variant="danger">{this.state.error.toString()}</Alert>
                            </Col>}
                        </Row>
                        <Row>
                            <input onChange={this.onUsernameChange} placeholder="Username" />
                        </Row>
                        <Row>
                            <input onChange={this.onPasswordChange} placeholder="Password" type="password" />
                        </Row>
                        <Row>
                            <input onChange={this.onPasswordConfirmChange} placeholder="Confirm Password" type="password" />
                        </Row>
                        <Row>
                            <button onClick={this.register}>Register</button>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}