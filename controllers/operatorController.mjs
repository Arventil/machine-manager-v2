import bcryptjs from 'bcryptjs';

import db from '../db/dbSettings.mjs';

import { throwErr, logAndSendErr } from '../utils/errHelper.mjs';

const Operator = db.Operator;

export const postAddNewOperator = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const rePassword = req.body.rePassword;
    const role = req.body.role;

    Operator.findOne({
        where: {
            username: username
        }
    })
        .then(operator => {
            if (operator) {
                throwErr(409, 'Conflict - That username already exists!');
            }

            if (password === rePassword) {
                return bcryptjs.hash(password, 12);
            }

            throwErr(422, 'Unprocessable Entity - Passwords are not equal!');
        })
        .then(hashedPassword => {
            return Operator.create({
                username: username,
                password: hashedPassword,
                role: role
            });
        })
        .then(operator => {
            return res.status(200).json({
                success: true,
                message: `Operator ${operator.username} successfully created!`
            });
        })
        .catch(err => {
            logAndSendErr(err, req, res);
        });
};
