const express = require('express');
const bodyParser = require('body-parser');
const mydb = require('./config/db');
const router = require('./routes/router'); 
const app = express();
const PORT = 5000;
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(router); 



app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`));
