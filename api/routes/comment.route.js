import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getConcoursComments, likeComment, editComment, deleteComment } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getConcoursComments/:concoursId', getConcoursComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;