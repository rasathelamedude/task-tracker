import dotenv from 'dotenv';

dotenv.config({ path: ".env.development.local" });

export const { PORT, CONNECTION_STRING, JWT_SECRET, JWT_EXPIRES_IN } = process.env;