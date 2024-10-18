import express from 'express';
import codeRushController from './controllers/codeRushController.js';

const router = express.Router();

router.post("/", codeRushController.postTeam);

export default router;