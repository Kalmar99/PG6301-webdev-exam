import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            user: null
        }
    }

    componentDidMount() {
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
            this.setState({error: 'You are not logged in'})
            return;
        }

        if(response.status !== 200) {
            this.setState({error: 'Something went wrong, code: ' + response.status})
            return;
        }
        console.log(payload)
        this.props.setLoginStatus(payload.username)
        //Store the user to display coins etc.
        this.setState({user: payload,error: null})
        return;
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col>{this.state.error !== null && <p>{this.state.error.toString()}</p>}</Col>
                </Row>
                {this.state.user !== null && <Row>
                    <Col lg={3}>Username: {this.state.user.username}</Col>
                    <Col lg={3}>Coins: {this.state.user.coins}</Col>
                </Row>}
            </Container>
        )
    }
}