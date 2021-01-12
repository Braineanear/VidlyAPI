import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import returns from '../controllers/returnController.js';

const router = Router();

//====================User's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY LOGGED IN USERS CAN ACCESS THESE ROUTES

router.post('/', protect, returns);

export default router;
