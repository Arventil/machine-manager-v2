import { promises as fs } from 'fs';

import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import db from '../db/dbSettings.mjs';

import { throwErr, logAndSendErr } from '../utils/errHelper.mjs';

const { Operator, FiredUpToken } = db;

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
            logAndSendErr(err, req, res);
        });
};

export const postLogout = (req, res) => {
    const token = req.get('Authorization').split(' ')[1];

    FiredUpToken.create({
        token: token
    })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Logout successfully'
            });
        })
        .catch(err => {
            logAndSendErr(err, req, res);
        });
};
