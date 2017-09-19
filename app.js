const express = require('express');
const app = express();



// app.get('/', function(req, res) {
//     res.render('hello world');
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

