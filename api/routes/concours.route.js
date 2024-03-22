import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getconcours, deleteconcours, updateconcours } from '../controllers/concours.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getconcours', getconcours)
router.delete('/deleteconcours/:concoursId/:userId', verifyToken, deleteconcours)
router.put('/updateconcours/:concoursId/:userId', verifyToken, updateconcours)


export default router;