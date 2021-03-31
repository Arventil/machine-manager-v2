import { promises as fs } from 'fs';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../db/dbSettings.mjs';

import { throwErr, logAndSendErr } from '../utils/errHelper.mjs';

const Operator = db.Operator;

export const postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let recivedOperator;

    Operator.findOne({
        where: {
            username: username
        }
    })
        .then(operator => {
            if (!operator) {
                throwErr(422, 'Unprocessable Entity - User not found!');
            }
            recivedOperator = operator;

            return bcryptjs.compare(password, operator.password);
        })
        .then(comparisionResult => {
            if (!comparisionResult) {
                throwErr(422, 'Unprocessable Entity - Password is not correct!');
            }

            return fs.readFile('./keys/private.key');
        })
        .then(privateKey => {
            return jwt.sign({
                id: recivedOperator.id,
                role: recivedOperator.role
            },
            privateKey,
            {
                expiresIn: '30min',
                algorithm: 'RS256'
            });
        })
        .then(token => {
            return res.status(200).json({
                success: true,
                message: 'Successfully logged in!',
                token: token
            });
        })
        .catch(err => {
            logAndSendErr(err, res);
        });
};

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
            logAndSendErr(err, res);
        });
};
