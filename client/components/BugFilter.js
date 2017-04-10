
import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'


import styles from '../css/bugFilter.css'

import { logRequest } from '../actions/logActions'


class BugFilter extends React.Component {

    constructor(props){
        super(props)

        this.state = {
			startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            keyWord:''
        }

        this.handleFilterList = this.handleFilterList.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleFilterList(filterParam){
        this.logRequest(filterParam)
    }
	handleEvent(event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
	}
    render(){
        let start = this.state.startDate.format('YYYY-MM-DD');
        let end = this.state.endDate.format('YYYY-MM-DD');
        let label = start + ' - ' + end;

        return (
            <div className={styles.formGroup}>
                <div className="col-md-6">
                    <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate}  onEvent={this.handleEvent}>
                        <span>
                            <input type="text" className="form-control input-group-lg" value={label} placeholder="" />
                        </span>
                    </DateRangePicker>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-2">
                    <input type="text" className="form-control input-group-lg" placeholder="请输入关键字" />
                </div>
                <div className="col-md-1">
                    <button className="btn btn-primary" >筛选</button>
                </div>
                <div className="col-md-1">
                    <button className="btn btn-default" >重置</button>
                </div>
            </div>
            )
    }

}
BugFilter.propTypes = {
  logRequest: React.PropTypes.func.isRequired
}

export default connect(null, { logRequest })(BugFilter);
