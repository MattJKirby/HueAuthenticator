const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// modules
let asyncRequest = require('./asyncRequest');
require('./DeviceSetup/HueBridgeSetup')(app, asyncRequest);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


app.get('/express', (req, res) => {
    res.send({ express: true });
});


