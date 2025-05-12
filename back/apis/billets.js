import express from 'express';
import { clientModifierBillet, employeModifierBillet, getAll, getClientBillets, getOneByCode, getStatistics } from '../controllers/billetController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/client/:id', getClientBillets);
router.get('/stats', getStatistics);
router.get('/:code', getOneByCode);
router.put('/modifier/client', clientModifierBillet);
router.put('/modifier/employe', employeModifierBillet);


export default router;
