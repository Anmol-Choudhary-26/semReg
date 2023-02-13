const express = require('express')
const helmet = require('helmet')
const connectDB = require('./db/connect')
const app = express()
const port =  process.env.PORT || 3000

app.use(helmet())
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }))
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())

app.get('/', (req,res) =>{
    res.send('Hello World')
})

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();



