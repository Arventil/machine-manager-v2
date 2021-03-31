import express from 'express';

import { postLogin, postAddNewOperator } from '../controllers/operatorController.mjs';

const router = express.Router();

router.post('/login', postLogin);

export default router;
