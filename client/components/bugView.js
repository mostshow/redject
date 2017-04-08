
import React from 'react';
import moment from 'moment'

import styles from '../css/buglist.css';

class LogView extends React.Component {

  render() {
    const { col, createAt, ip, level, msg, referer, resolution, row, sourceFile, type, userAgent } = this.props.log;
    return (
        <tr>
            <td className="col-md-1">{moment(+createAt).format('YYYY-MM-DD HH:mm')}</td>
            <td className="col-md-1">{level}</td>
            <td className="col-md-1">{type}</td>
            <td className="col-md-1">{ip}</td>
            <td className="col-md-1">{resolution}</td>
            <td className="col-md-1">{referer}</td>
            <td className="col-md-2">{sourceFile}</td>
            <td className="col-md-3">{msg} <img alt="view source file" title="查询原文件错误信息" src="/images/info.png" className={styles.info}/></td>
            <td className="col-md-1">{ userAgent }</td>
        </tr>
    );
  }
}

LogView.propTypes = {
  log: React.PropTypes.object.isRequired,
}

export default LogView;
