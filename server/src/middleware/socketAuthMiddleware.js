import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('jwt='))
      ?.split('=')[1];

    if (!token) {
      return next(new Error('Unauthorized - No token found'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(new Error('Unauthorized - Invalid token'));
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return next(new Error('Unauthorized - User not found'));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName}`);

    next();
  } catch (error) {
    console.log('Error in socketAuthMiddleware middleware: ', error);
    next(new Error('Unauthorized - Authentication failed'));
  }
};
