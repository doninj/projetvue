const express = require('express');
const path = require('path');
const app = express();
const port = 3080;
const history = require('connect-history-api-fallback');
const cors = require('cors')
const staticFileMiddleware = express.static('dist');

app.use(cors())

app.get('/api/lol', cors(), (req,res) => {
  res.json({'test':'test'})
})
app.use(history());
app.use(staticFileMiddleware);
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});