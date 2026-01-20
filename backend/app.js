const express =require('express');
const signupRoute = require('./routes/signup');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/user",signupRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})