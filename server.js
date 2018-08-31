const path = require('path')
const express = require('express')
const webpack = require('webpack')

const port = 3000
const config = require('./configs/webpack.config.js');
let app = express()
let compiler = webpack(config)

const staticpath = path.join(__dirname, './public')
app.use(express.static(staticpath))

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });