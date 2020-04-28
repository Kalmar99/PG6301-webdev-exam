import React from 'react'
import ReactDOM from 'react-dom'
import {Home} from './Home'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: null
        }
    }

    setLoginStatus = (userId) => {
        this.setState({userId});
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/"
                            render={props => <Home {...props}
                                userId={this.state.userId}
                                setLoginStatus={this.setLoginStatus} />} />
                    </Switch>
                </div>
            </BrowserRouter>
            )
    }   
}

ReactDOM.render(<App />, document.getElementById("root"));