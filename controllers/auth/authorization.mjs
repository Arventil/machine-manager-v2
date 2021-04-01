export const authroziationAdmin = (req, res, next) => {
    if (req.operator.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden - Insufficient privileges!'
        });
    }

    return next();
};
