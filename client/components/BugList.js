
import React from 'react'
import { connect } from 'react-redux'

import LogView from './bugView'

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render(){
        const Log = this.props.logList.map(log =>
            <LogView  key={log._id} log={log}  />
        )
        return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Level</th>
                        <th>Type</th>
                        <th>IP</th>
                        <th>Resolution</th>
                        <th>Referer</th>
                        <th>Source-File</th>
                        <th>Message</th>
                        <th>UA</th>
                    </tr>
                </thead>
                <tbody>
                    {Log}
                </tbody>
            </table>
        </div>

    )
}
}

function mapStateToProps(state) {
    return {
        logList: state.logList
    }
}

export default connect(mapStateToProps,{})(BugList)
