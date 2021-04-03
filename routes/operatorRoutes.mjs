import express from 'express';

import { authroziationAdmin } from '../controllers/auth/authorization.mjs';
import { postAddNewOperator } from '../controllers/operatorController.mjs';

const router = express.Router();

router.post('/addNewOperator', authroziationAdmin, postAddNewOperator);

export default router;
