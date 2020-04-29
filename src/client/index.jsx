/*
    This file is based on the index.jsx file from lecture 8 but mofidied to fit my project
    LINK: https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/index.jsx
*/

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

import {BrowserRouter, Switch, Route,Link} from 'react-router-dom'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            error: null
        }
    }

    notFound = () => {
        return (
            <Container className="page h-100">
                <Row className="justify-content-center mt-3 pt-3">
                    <Col lg={3}><h3>404 NOT FOUND</h3></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={3}><p>Go back to <Link to="/">frontpage</Link></p></Col>
                </Row>
            </Container>
        )
    }
 
    setLoginStatus = (username) => {
        this.setState({username: username}); 
    };

    fetchUser = async (done) => {
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
            return;
        }
        
        return done(payload);
    }
    

    render() {
        return (
            <BrowserRouter>
                <Container className="h-100">
                    <Row className="h-100">
                        <Switch>
                            <Route exact path="/pokemon"
                                    render={props => <Pokemon {...props}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/shop"
                                    render={props => <Shop {...props}
                                        fetchUser={this.fetchUser}
                                        username={this.state.username}
                                        setLoginStatus={this.setLoginStatus} />} />
                            <Route exact path="/collection"
                                    render={props => <Collection {...props}
                                        username={this.state.username}
                                        fetchUser={this.fetchUser}
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
                            <Route component={this.notFound}></Route>
                        </Switch>
                    </Row>
                    
                </Container>
            </BrowserRouter>
            )
    }   
}

ReactDOM.render(<App />, document.getElementById("root"));