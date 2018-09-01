const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./configs/webpack.config.js');
const port = config.devServer.port
let app = express()
let compiler = webpack(config)

const middleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
})
app.use(middleware)
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  reload: true,
  path: "/__webpack_hmr",
  heartbeat: 2000,
}))

const staticpath = path.join(__dirname, './public')
app.use(express.static(staticpath))
app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
