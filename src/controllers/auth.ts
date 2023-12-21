import { getUserByEmail , createUser } from '../db/users'
import express from 'express'
import { auth, random } from '../helpers'

export const login = async (req: express.Request, res: express.Response) => { 
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.sendStatus(400)
        }
        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt')

        if(!user) {
            return res.sendStatus(400)
        }

        const expectedHash = auth(password,user.authentication.salt);

        if (expectedHash !== user.authentication.password) {
            return res.sendStatus(400)
        }

        const salt = random()

        user.authentication.sessionToken = auth(salt, user._id.toString())
        await user.save()


        res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/', httpOnly: true, secure: false, maxAge: 3600 * 24 * 7 })
        
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }

}


export const register = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username } = req.body;
  
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }
  
      const existingUser = await getUserByEmail(email);
    
      if (existingUser) {
        return res.sendStatus(400);
      }
  
      const salt = random();
      const user = await createUser({
        email,
        username,
        authentication: {
        password: auth(password, salt),
        salt
        },
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }