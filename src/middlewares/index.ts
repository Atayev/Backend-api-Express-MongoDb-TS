import express from 'express'
import {get, merge} from 'lodash'

import { getIsAuth } from '../db/users'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        const { id } = req.params
        const currentUserId = get(req, 'user._id') as string
        if (!currentUserId) {
            return res.send({
                message: 'Not allowed',
                status: 403
            })
        }
        if(currentUserId !== id) {
            return res.send({
                message: 'Not allowed',
                status: 403
            })
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
}

export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = get(req, 'cookies.sessionToken')
        if (!sessionToken) {
            return res.sendStatus(401)
        }
        const user = await getIsAuth(sessionToken)
        if (!user) {
            return res.sendStatus(401)
        }
        merge(req, { user })
        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
}