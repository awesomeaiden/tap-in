/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.post('/register', controller.registerUser);

export = router;
