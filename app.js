const express = require('express')
const app = express()
const helmet = require('helmet')
const User = require('./models/userModel')
const connectDb = require('./db/connection')
require('dotenv').config()
const UserRoute = require('./routes/userRoutes')
const DocRoute = require('./routes/DocRoutes')
const port =  process.env.PORT || 3000

// middleware

app.use(express.static('./public'));
app.use(express.json());

// app.use(helmet())
// app.use(helmet.xssFilter());
// app.use(helmet.frameguard({ action: 'deny' }))
// app.use(helmet.noSniff())
// app.use(helmet.ieNoOpen())

app.get('/', (req,res) =>{
    res.send('Hello World')
})
app.use('/Semreg/user', UserRoute)
app.use('/Semreg/Doc', DocRoute)

const start = () => {
  try {
    // console.log(process.env.MONGO_URI)
    connectDb(process.env.MONGO_URI).then(()=>{
      console.log('Success')
      app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    }).catch((error)=>{
      console.log(error)
    })
  } catch (error) {
    console.log(error);
  }
};

start();




