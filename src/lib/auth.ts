import { SignJWT, jwtVerify } from 'jose';
import type { User } from './types';

// This is a mock database. In a real application, you'd use a proper database.
const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'password123' },
];

export async function signupUser(name: string, email: string, password: string): Promise<Omit<User, 'password'>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.find(u => u.email === email)) {
        reject(new Error('User with this email already exists.'));
      } else {
        const newUser: User = {
          id: String(users.length + 1),
          name,
          email,
          password, // In a real app, hash and salt this password!
        };
        users.push(newUser);
        const { password: _, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }
    }, 500);
  });
}

export async function loginUser(email: string, password: string, secret: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const user = users.find(u => u.email === email);

            if (!user || user.password !== password) {
                reject(new Error('Invalid email or password.'));
                return;
            }

            const { password: _, ...userWithoutPassword } = user;
            
            const token = await new SignJWT(userWithoutPassword)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1w')
                .sign(new TextEncoder().encode(secret));
            
            resolve({ token, user: userWithoutPassword });
        }, 500)
    });
}

export async function verifyToken(token: string, secret: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  } catch (error) {
    return null;
  }
}
