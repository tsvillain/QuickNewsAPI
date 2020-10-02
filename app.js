const express = require('express');
const cors = require('cors');

//ROUTER
const userRouter = require('./routes/userRoute');

const app = express();
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);

app.all('*', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;