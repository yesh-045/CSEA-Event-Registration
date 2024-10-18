import express from 'express';
import homeController from '../controllers/homeController.js';

const router = express.Router();

// Define the home route
router.get('/', homeController.getHome);

export default router;
