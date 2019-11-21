import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
const app : express.Application = express();
const port : string | number = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

var routes = require('./api/productosRoutes');
routes(app);

app.listen(port, () => {
    console.log('API starteada en: ' + port);
});



