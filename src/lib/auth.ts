import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-default-key-please-change';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key-please-change';

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateOTP = () => {
  // Generate a 6 digit numeric OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenHash = () => {
  return crypto.randomBytes(40).toString('hex');
};

export const getUserFromRequest = async (req: Request) => {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return null;
    const claims = verifyAccessToken(token);
    if (!claims) return null;
    return await prisma.user.findUnique({ where: { id: claims.id } });
  } catch (error) {
    return null;
  }
};

