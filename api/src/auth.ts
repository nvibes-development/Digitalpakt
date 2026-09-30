import { randomBytes, randomUUID, createHash } from 'node:crypto';
import argon2 from 'argon2';
import { Pool } from 'pg';
import { z } from 'zod';

const sessionDays = 7;
export const registerSchema = z.object({ email: z.email(), password: z.string().min(12), firstName: z.string().trim().min(1), lastName: z.string().trim().min(1), displayName: z.string().trim().min(1).max(120).optional() });
export const loginSchema = z.object({ email: z.email(), password: z.string().min(1) });
export type SafeUser = { id: string; email: string; firstName: string; lastName: string; displayName: string | null; role: 'school_admin' };
type UserRecord = SafeUser & { passwordHash: string; active: boolean };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const normalizedEmail = (email: string) => email.trim().toLowerCase();
const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export async function register(input: z.infer<typeof registerSchema>) {
  const id = randomUUID();
  const email = normalizedEmail(input.email);
  const passwordHash = await argon2.hash(input.password, { type: argon2.argon2id });
  try {
    const result = await pool.query<SafeUser>(`INSERT INTO users (id,email,password_hash,first_name,last_name,display_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,email,first_name AS "firstName",last_name AS "lastName",display_name AS "displayName",role`, [id, email, passwordHash, input.firstName.trim(), input.lastName.trim(), input.displayName ?? null]);
    return createSession(result.rows[0]);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === '23505') throw new Error('EMAIL_EXISTS');
    throw error;
  }
}

export async function login(input: z.infer<typeof loginSchema>) {
  const result = await pool.query<UserRecord>(`SELECT id,email,password_hash AS "passwordHash",first_name AS "firstName",last_name AS "lastName",display_name AS "displayName",role,active FROM users WHERE lower(email)=lower($1)`, [normalizedEmail(input.email)]);
  const user = result.rows[0];
  if (!user || !user.active || !(await argon2.verify(user.passwordHash, input.password))) throw new Error('INVALID_CREDENTIALS');
  await pool.query('UPDATE users SET last_login_at = now(), updated_at = now() WHERE id = $1', [user.id]);
  return createSession({ id:user.id,email:user.email,firstName:user.firstName,lastName:user.lastName,displayName:user.displayName,role:user.role });
}

async function createSession(user: SafeUser) {
  const token = randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + sessionDays * 86400000);
  await pool.query('INSERT INTO sessions (id,user_id,token_hash,expires_at) VALUES ($1,$2,$3,$4)', [randomUUID(), user.id, tokenHash(token), expires]);
  return { user, token, expires };
}

export async function currentUser(token?: string): Promise<SafeUser | null> {
  if (!token) return null;
  const result = await pool.query<SafeUser>(`SELECT u.id,u.email,u.first_name AS "firstName",u.last_name AS "lastName",u.display_name AS "displayName",u.role FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.revoked_at IS NULL AND s.expires_at > now() AND u.active`, [tokenHash(token)]);
  return result.rows[0] ?? null;
}

export async function revoke(token?: string) {
  if (token) await pool.query('UPDATE sessions SET revoked_at = now() WHERE token_hash = $1 AND revoked_at IS NULL', [tokenHash(token)]);
}
