const admin = require('firebase-admin');
const express = require('express');
const app = express();
var serviceAccount = require('./fir-demo-7c66e-firebase-adminsdk-1jcrc-25e383efdd.json');
const {firestore} = require('firebase-admin');
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/send-noti', (req, res) => {
  console.log(req.body);
  //   const message = {
  //     notification: {
  //       title: 'new post',
  //       body: 'new post available click to open',
  //     },
  //     token: req.body,
  //   };
  //   admin
  //     .messaging()
  //     .send(message)
  //     .then(res => {
  //       console.log('success');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
});

//fluzfWLbRLqPXf4Oahbpfj:APA91bF5BCmaWdQkCG8XXC8vdWCSZixyuKmP0tUK7eVGbXkj7iaUa6t4R-JkHvjkMPRLJ-xAVha6CvqKIlqu0g47HimSi_awou0JKeMYxNtMuPTQAwMgrlRfy-M1M4xfP7Ufm9EMRyj5
