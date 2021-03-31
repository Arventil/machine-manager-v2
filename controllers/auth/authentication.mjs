import fs from 'fs';

import jwt from 'jsonwebtoken';

import { logAndSendErr } from '../../utils/errHelper.mjs';

const authentication = (req, res, next) => {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated!'
        });
    }

    const token = authorizationHeader.split(' ')[1];

    fs.readFile('../../keys/public.key')
        .then(publicKey => {
            return jwt.verify(token, publicKey, {
                expiresIn: '30min',
                algorithm: 'RS256'
            });
        })
        .then(verificationResult => {
            if (!verificationResult) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated!'
                });
            }
            console.log(verificationResult);

            next();
        })
        .catch(err => {
            logAndSendErr(err, res);
        });
};

export default authentication;
