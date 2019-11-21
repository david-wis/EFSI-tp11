"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
var routes = require('./api/productosRoutes');
routes(app);
app.listen(port, function () {
    console.log('API starteada en: ' + port);
});
