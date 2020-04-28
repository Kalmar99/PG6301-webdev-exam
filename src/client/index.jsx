import React from 'react'
import ReactDOM from 'react-dom'

import {Home} from './Home'
import {Login} from './login'
import {Register} from './register'
import {Pokemon} from './pokemon'
import {Collection} from './collection'
import {Shop} from './shop'

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
            return;
        }

        if(response.status == 401) {
            this.setState({error: 'You are not logged in',username: null,user: null})
            this.props.setLoginStatus(false)
            return;
        }

        if(response.status !== 200) {
            this.setState({error: 'Something went wrong, code: ' + response.status,username: null,user: null})
            this.setLoginStatus(false)
            return;
        }
        
        this.setLoginStatus(payload.username)
        return;
    }

    setLoginStatus = (username) => {
        this.setState({username:username});
        
    };

    render() {
        return (
            <BrowserRouter>
                <Container className="h-100">
                    <Row className="h-75">
                        <Switch>
                            <Route exact path="/pokemon"
                                    render={props => <Pokemon {...props}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/shop"
                                    render={props => <Shop {...props}
                                        username={this.state.username}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/collection"
                                    render={props => <Collection {...props}
                                        username={this.state.username}
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