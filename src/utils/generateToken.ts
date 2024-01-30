import { randomBytes, createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const generateToken = (user: UserData) => {
  const token = randomBytes(32).toString('hex') + user.name;
  const activationString = createHash('sha256').update(token).digest('hex');
  const activationToken = jwt.sign(
    { user, activationString },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  cookies().set('activationToken', activationToken, {
    secure: true,
    httpOnly: true,
  });
  return { activationString, activationToken };
};
