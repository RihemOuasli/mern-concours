import express from 'express';
import { test, updateUser, deleteUser, signout, getUsers, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', test);

/** modifier profile */
router.put('/update/:userId', verifyToken, updateUser);

/** supprimer compte */
router.delete('/delete/:userId', verifyToken,deleteUser);

/** deconnexion */
router.post('/signout', signout);

/** afficher users */
router.get('/getusers',verifyToken, getUsers);


/**  */
router.get('/:userId', getUser)



export default router;