
import React from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import { logRequest } from '../actions/logActions'


class App extends React.Component {

    componentDidMount() {
        this.props.logRequest({})
    }

    render(){
        return (
            <div class="container">
                <NavigationBar />
                {this.props.children}
            </div>
        )

    }
}
App.propTypes = {
  logRequest: React.PropTypes.func.isRequired
}

export default connect(null, { logRequest })(App);
