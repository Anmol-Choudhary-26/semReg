const express = require('express')
const app = express()
const helmet = require('helmet')
const authRouter = require('./routes/auth');
const User = require('./models/userModel')
const connectDb = require('./db/connection')
require('dotenv').config()
const UserRoute = require('./routes/userRoutes')
const DocRoute = require('./routes/DocRoutes')
const port =  process.env.PORT || 8080
// const authMiddleware = require('./middleware/auth')
const teacher = require('./routes/teacherRoutes')
// middleware

app.use(express.static('./public'));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// app.use('/', authMiddleware)
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     // ...
//   })
// );
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(helmet.xssFilter());
// app.use(helmet.frameguard({ action: 'deny' }))
// app.use(helmet.noSniff())
// app.use(helmet.ieNoOpen())

app.use('/auth', authRouter);
app.use('/semreg/user', UserRoute)
app.use('/semreg/doc',  DocRoute)
app.use('/semreg/teacher', teacher)

// Database connection

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