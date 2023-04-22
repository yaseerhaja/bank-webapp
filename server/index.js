const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

const transactions = require('./routes/api/transactions');

app.use('/api', transactions);

if (process.env['NODE_ENV'] === 'production') {
  //Static Folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

const port = process.env.PORT || 5003;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
