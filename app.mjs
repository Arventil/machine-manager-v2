import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
    res.status(200).json({message: 'Hello World!'});
})

app.listen(3000);