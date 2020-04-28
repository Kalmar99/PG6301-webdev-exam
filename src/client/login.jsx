import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
            <Container>
                <Row>
                    <Container>
                        <Row>
                            <Col><input onChange={this.onChangeUsername} placeholder='Username' type="text" /></Col>
                        </Row>
                        <Row>
                            <Col><input onChange={this.onChangePassword} placeholder="Password" type="password" /></Col>
                        </Row>
                        <Row>
                            <Col><button onClick={this.login}>Log In</button></Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}