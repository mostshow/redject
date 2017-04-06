
import React from 'react'
import styles from '../css/buglist.css';

export default () => {
    return (

            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>IP</th>
                            <th>目标网页</th>
                            <th>错误信息</th>
                            <th>目标文件</th>
                            <th>分辨率</th>
                            <th>页面来路</th>
                            <th>UA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-md-1">2017/4/6 上午9:41:00</td>
                            <td className="col-md-1">10.16.8.5</td>
                            <td className="col-md-2">http://localhost:8080/index/index.html?</td>
                            <td className="col-md-2">ReferenceError: b is not defined at http://localhost:8080/index/index.html?:45:14</td>
                            <td className="col-md-1">http://localhost:8080/index/index.html? <img alt="查询原文件错误信息" title="查询原文件错误信息" src="/images/info.png" className={styles.info}/></td>
                            <td className="col-md-1">1440*900</td>
                            <td className="col-md-1"></td>
                            <td className="col-md-3">苹果，谷歌内核:----Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36</td>
                        </tr>
                    </tbody>
                </table>
            </div>

    )
}


