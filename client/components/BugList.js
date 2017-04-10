
import React from 'react'
import { connect } from 'react-redux'

import BugView from './BugView'
import BugFilter from './BugFilter'

import { parseSourceMap } from '../actions/logActions'

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.handleParseSourceMap = this.handleParseSourceMap.bind(this);
        this.state = {
        }

    }


    handleParseSourceMap(logData){
        this.props.parseSourceMap({
            row:logData.row,
            col:logData.col,
            sourceMapSrc:logData.sourceFile + '.map'
        }).then((res) => {
            if (res.status == 200 && res.data) {
                if (res.data.rtn == 0) {
                    var str = '文件名: ' + res.data.message.source + '\n';
                    str += '行号: ' + res.data.message.line + '\n';
                    str += '变量名: ' + res.data.message.name + '\n';
                    alert(str);
                } else {
                    alert(res.data.message || 'request file error!');
                }
            } else {
                console.error(res);
            }
        },(err) => {
            console.error(err);
        })
    }

    render(){
        const Log = this.props.logList.map(log =>
            <BugView  key={log._id} log={log} handleParseSourceMap = {this.handleParseSourceMap}  />
        )
        return (
        <div>
            <BugFilter />
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

export default connect(mapStateToProps,{parseSourceMap})(BugList)
