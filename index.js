const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const errorHandler = require('./src/middleware/error-handle');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))

//health
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// api routes
// app.use('/user', require('./src/controller/user.controller'));


// global error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`listening localhost:3000`);
});