const express = require('express')
const app = express()

// Import Chatkit SDK
const Chatkit = require('@pusher/chatkit-server');

// Import config from .env file
const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors')
const port = 3001

// Create a chatkit instance
const chatkit = new Chatkit.default({
    instanceLocator: process.env.INSTANCE_LOCATOR,
    key: process.env.API_KEY,
  })

// Enable Body Parser
app.use(express.json());

// Enable cors 
app.use(cors());

// auth login route
app.post('/auth/login', (req, res) => {
    chatkit.getUser({
        id: req.body.userId,
    })
    .then(user => {
        res.json({status: 'Success', data: user}).status(200);
    })
    .catch(err => {
        res.json({status: 'Error', data: err.error_description});
    })
})

// auth registration route
app.post('/auth/register', (req, res) => {
    chatkit.createUser({
        id: req.body.userId,
        name: req.body.name
    })
    .then((user) => {
        res.json({status: 'Success', data: user}).status(200);
    }).catch((err) => {
        res.json({status: 'Error', data: err.error_description});
    });
})

// Starting point
app.get('/', (req, res) => res.send('Hello from the server!'));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}!`);
})