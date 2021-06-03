import { promises as fs } from 'fs';

export const throwErr = (statusCode, message) => {
    const err = new Error(message);

    err.statusCode = statusCode;
    throw err;
};

export const logAndSendErr = (err, req, res) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }

    const now = new Date((new Date().getTime()) + 7200000);
    let operatorId = req.operator ? req.operator.id : 'none';

    const errFullDataObject = {
        success: false,
        date: now,
        operatorId: operatorId,
        errStatusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
        errors: err.errors,
        original: err.original,
        err: err
    };

    if (process.env.NODE_ENV !== 'test') {
        console.log(errFullDataObject);
    }

    fs.appendFile('./Logs/logs.log', JSON.stringify(errFullDataObject) + '\n')
        .catch(err => {
            console.log(err);
        });

    return res.status(err.statusCode).json(errFullDataObject);
};
