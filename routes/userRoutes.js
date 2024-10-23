// Modules
import express from 'express';
import { index, store, show, update, destroy } from '../controllers/userController.js'

// Setup
const router = express.Router()

router.get('/', index)
router.post('/store', store)
router.get('/show/:id', show)
router.put('/update/:id', update)
router.delete('/delete/:id', destroy)

// Export Module
export default router