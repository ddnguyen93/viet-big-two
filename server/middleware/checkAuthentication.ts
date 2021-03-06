import { UserAuthInfoRequest } from '../types/extendedTypes';

const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

exports.checkAuthentication = (
	req: UserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization!.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed!');
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.userData = {
			userID: decodedToken.userId,
			username: decodedToken.username,
		};
		next();
	} catch (err) {
		res.status(404).json({ error: 'Authentication Failed.' });
	}
};
