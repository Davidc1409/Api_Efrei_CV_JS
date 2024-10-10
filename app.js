require('dotenv').config();
const mongoose=require('mongoose')
const express = require('express');
const cors = require('cors');
const app = express();

//const apiRouter = require('./routes')
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Serveur fonctionne');
});

//app.use('/api/', apiRouter);

app.listen(3000, () => {
    console.log('server is running');

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log("Error when trying to connect to the database:", error);
        });
})
module.exports = app;