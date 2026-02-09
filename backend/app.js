const express = require('express');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const noteRoute = require('./routes/note');
const getNoteRoute = require('./routes/getnote');
require('./configuration/dbConfig'); // Initialize database connection
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", signupRoute)
app.use("/auth", loginRoute)
app.use("/note", noteRoute)
app.use("/dashboard", getNoteRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})