import express from 'express';

import { postLogin } from '../controllers/sessionController.mjs';

const router = express.Router();

router.post('/login', postLogin);

export default router;
