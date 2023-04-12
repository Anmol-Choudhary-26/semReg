const firebase =  require("firebase/app");
const firebaseAuth = require("firebase/auth");
const express = require('express')
const router = express.Router()
const createUserWithEmailAndPassword = require('firebase/auth').createUserWithEmailAndPassword;
const sed = require('firebase/auth').sendEmailVerification;
const onAuthStateChanged = require('firebase/auth').onAuthStateChanged
const signInWithEmailAndPassword = require('firebase/auth').signInWithEmailAndPassword
const Vtoken = require('firebase/auth')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebaseAuth.getAuth(app);


  async function  createuser(req, res){
    await  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in 
       req.user = userCredential.user;
        sed(req.user).then(()=>{
          console.log("verification link send")
          status(req.user)
        })
        res.status(200).json({msg : "verification link send"})
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        res.status(400).json({msg: errorCode})
      });
    }
  
    function status(user){
        onAuthStateChanged(auth, (user1) => {
          if (user1) {
            const uid = user1.uid;
            console.log("Uid of User is " + uid)
          } else {
              console.log("No user Created")
          }
        });
        }


        function signin(req, res){
            signInWithEmailAndPassword(auth, req.body.email, req.body.password)
            .then((userCredential) => {
              req.user = userCredential.user;
              var id = req.user.uid
              var email = req.user.email
              console.log(id, email)
              if(req.user.emailVerified){
                console.log("email verified")
                const token = jwt.sign({ id, email }, "hellomfs", {
                  expiresIn: '30d',
                })
                res.status(200).json({ msg: 'User Created', token, email })
              }
              else{
                console.log("email not verified")
                res.status(401).json({msg:"Email not Verified"})
              }
            })
            .catch((error) => {
              var errorCode = error.code;
              res.status(500).json({msg:errorCode})
            });
           }
          
module.exports = {signin, createuser, status}