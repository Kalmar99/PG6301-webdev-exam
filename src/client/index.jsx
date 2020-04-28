import React from 'react'
import ReactDOM from 'react-dom'
import {Home} from './Home'
import {Login} from './login'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null
        }
    }


    setLoginStatus = (username) => {
        this.setState({username:username});
        console.log('User Logged in: ' + username)
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                                render={props => <Login {...props}
                                    setLoginStatus={this.setLoginStatus} />} />
                        <Route exact path="/"
                            render={props => <Home {...props}
                                username={this.state.userId}
                                setLoginStatus={this.setLoginStatus} />} />
                    </Switch>
                </div>
            </BrowserRouter>
            )
    }   
}

ReactDOM.render(<App />, document.getElementById("root"));