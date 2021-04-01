import { promises as fs } from 'fs';

import jwt from 'jsonwebtoken';

import { logAndSendErr } from '../../utils/errHelper.mjs';

const authentication = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    if (req.url === '/api/login') {
        return next();
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated!'
        });
    }

    fs.readFile('./keys/public.key')
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

            req.operator = {
                id: verificationResult.id,
                role: verificationResult.role
            };

            return next();
        })
        .catch(err => {
            logAndSendErr(err, res);
        });
};

export default authentication;
