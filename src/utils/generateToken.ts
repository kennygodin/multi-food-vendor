import { User, Vendor } from '@prisma/client';
import { randomBytes, createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface GeneratedToken {
  emailString: string;
  jwtToken: string;
}

export const generateToken = (user: User | Vendor): GeneratedToken => {
  const randomString = randomBytes(32).toString('hex');
  const emailString = createHash('sha256').update(randomString).digest('hex');
  const jwtToken = jwt.sign(
    { user, emailString },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  cookies().set('jwt_token', jwtToken, {
    secure: true,
    httpOnly: true,
  });
  return { emailString, jwtToken };
};
