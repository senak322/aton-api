import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User';

interface CustomRequest extends Request {
    user?: typeof User;
  }

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await User.findById(decoded.id).select('-password') as any;
        if (user) {
            req.user = user;
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
