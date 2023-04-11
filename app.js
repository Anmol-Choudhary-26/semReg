const Doc = require('./models/UserDocument')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const helmet = require('helmet')
const authRouter = require('./routes/auth');
const User = require('./models/userModel')
const connectDb = require('./db/connection')
require('dotenv').config()
const UserRoute = require('./routes/userRoutes')
const DocRoute = require('./routes/DocRoutes')
const port =  process.env.PORT || 8080
const authMiddleware = require('./middleware/auth')
const teacher = require('./routes/teacherRoutes')
// middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.static('./public'));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/', authMiddleware)
// app.use(helmet())
// app.use(helmet.xssFilter());
// app.use(helmet.frameguard({ action: 'deny' }))
// app.use(helmet.noSniff())
// app.use(helmet.ieNoOpen())

app.use('/semreg/user', UserRoute)
app.use('/semreg/doc',  DocRoute)
app.use('/semreg/teacher', teacher)


app.use(fileUpload())

app.post('/upload', (req, res) => {
  const { registrationForm, feeReceipt, castCertificate1, incomeCertificate1 } = req.files
  const userId = req.body.id
  const doc = new Doc({
    registrationForm: registrationForm.data,
    feeReceipt: feeReceipt.data,
    modelAId:userId,
    incomeCertificate:incomeCertificate1.data,
    castCertificate:castCertificate1.data
  })

  doc.save()
    .then(() => res.status(200).send('File uploaded successfully'))
    .catch(err => res.status(500).send(err.message))
})


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




