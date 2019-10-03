const express = require('express')
const app = express()
const Chatkit = require('@pusher/chatkit-server');
// import * as config from '../../src/config';
// const {instanceLocator, apiKey} = require('../../src/config');

const cors = require('cors')
const port = 3001

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:6e9d8d73-f96c-460e-82f2-6b94432027bf",
    key: "f6086202-2f28-434a-a916-6d1016e55098:7xBBovdnJdqlSVLeNJmnvcglSNkaJU6MUhsxT31Nw0I=",
  })

app.use(express.json());
app.use(cors());

app.post('/auth', (req, res) => {
    console.log(req.body);
    // const authData = chatkit.authenticate({
    //   userId: req.body.userId
    // });

    chatkit.getUser({
        id: req.body.userId,
      })
        .then(user => {
            res.json({status: 'Success', data: user}).status(200);
        })
        .catch(err => {
            res.json({status: 'Error', data: err.error_description}).status(404);
        })

    // console.log(authData);
  
    // res.status(authData.status)
    //    .send(authData.body);
  })

app.get('/', (req, res) => res.send('Hello from the server!'));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}!`);
})