import React from 'react'
import ReactDOM from 'react-dom'
import {Home} from './Home'
import {Login} from './login'
import {Register} from './register'
import {Pokemon} from './pokemon'
import {Header} from './header'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            error: null
        }
    }

    setLoginStatus = (username) => {
        this.setState({username:username});
        
    };

    render() {
        return (
            <BrowserRouter>
                <Container>
                    <Row>
                        <Switch>
                            <Route exact path="/pokemon"
                                    render={props => <Pokemon {...props}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/login"
                                    render={props => <Login {...props}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/register"
                                    render={props => <Register {...props}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/"
                                render={props => <Home {...props}
                                    username={this.state.username}
                                    setLoginStatus={this.setLoginStatus} />} />
                        </Switch>
                    </Row>
                    
                </Container>
            </BrowserRouter>
            )
    }   
}

ReactDOM.render(<App />, document.getElementById("root"));