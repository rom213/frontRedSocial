import jwt from 'jsonwebtoken';

const SECRET_KEY = '586E3272357538782F413F4428472B4B6250655368566B597033733676397924';

export function decodeToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
