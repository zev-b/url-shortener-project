const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urls');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
