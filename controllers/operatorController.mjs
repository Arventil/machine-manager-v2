import bcryptjs from 'bcryptjs';

import db from '../db/dbSettings.mjs';

const Operator = db.Operator;

export const postAddNewOperator = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const rePassword = req.body.rePassword;
    const role = req.body.role;
};
