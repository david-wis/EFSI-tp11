import express = require('express');
import bodyParser = require('body-parser');
const app : express.Application = express();
const port : string | number = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/productosRoutes');
routes(app);

app.listen(port, () => {
    console.log('API starteada en: ' + port);
});

