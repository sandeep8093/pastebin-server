require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const pastesRouter =require('./routers/pastes.js');


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("MongoDB Error:", error));

mongoose.connection.on('connected', function () {  
  console.log('Mongodb Connected');
});
   

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.json());
app.use(cors());

app.use('/paste', pastesRouter);
app.use('/auth', require('./routers/users'));


app.get('/', function (req, res) {
  res.send('hello world')
  })

  app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    }); 
var PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
