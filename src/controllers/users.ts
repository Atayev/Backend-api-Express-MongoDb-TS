import express from 'express'

import { deleteUserById, getIsAuth, getUsers, updateUserById } from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) => { 
    try {
        const users = await getUsers()
        return res.status(200).json(users).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser =async (req:express.Request, res:express.Response) => {
    try {
        const { values } = req.body
        const user = await getIsAuth(req.cookies.sessionToken)

        if (!user) { 
            return res.sendStatus(401)
        }
        const updatedUser = await updateUserById(user._id.toString(), values)
        
        return res.status(200).json(updatedUser).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => { 

    try {
        const {id} = req.params

        const deleteUser = await deleteUserById(id)

        return res.status(200).json(deleteUser).end()

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}