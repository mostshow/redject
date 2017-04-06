
import express from 'express'
import path from 'path'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../webpack.config.dev'
import mongokeeper  from './models/mongokeeper'
import apiRouter from './routes/apiRouter'
import config from './config'



let app = express();

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler,{
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: false

}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, '../client')));

process.env.MONGO_DB_STR = config.devDbUrl;//config.dbConfig;
mongokeeper.config(config.dbConfig);

app.use('/api',apiRouter);

app.get('/*' ,(req, res) => {
    res.sendfile(path.join(__dirname, './index.html'))
})


app.listen(config.httpPort, () => console.log("You can debug your app with http://" + config.localhost + ':' +config.httpPort ))


