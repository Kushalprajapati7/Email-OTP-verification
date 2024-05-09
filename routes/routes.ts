import express from 'express';
import { sendOTP,verifyOTP } from '../controllers/controllers';

const router = express.Router();

router.get('/sendOTP', sendOTP);
router.get('/verifyOTP', verifyOTP);

export default router;