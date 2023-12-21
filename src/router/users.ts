import express from 'express'

import { getAllUsers } from '../controllers/users'
import { authMiddleware, isOwner } from '../middlewares'
export default (router: express.Router) => {
    router.get('/users', authMiddleware, getAllUsers)
    router.post('/updateUser/:id', authMiddleware, getAllUsers)
    router.post('/deleteUser/:id', authMiddleware,isOwner, getAllUsers)
} 