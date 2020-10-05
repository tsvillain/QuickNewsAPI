const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoute');
const articleRouter = require('./routes/articleRoute');

const app = express();
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/article', articleRouter);

app.all('*', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;