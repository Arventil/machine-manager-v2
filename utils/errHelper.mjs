const logAndSendErr = (err, res) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }

    console.log(err);

    res.status(err.statusCode).json({
        success: false,
        errStatusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
        errors: err.errors,
        original: err.original
    });
};

export default logAndSendErr;
