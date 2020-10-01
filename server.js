require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_CONNECT;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log("connected to DB"))
    .catch((err) => console.error("Failed to connect ", err));

app.listen(PORT, () => console.log("App listening to port ", PORT));