import jwt from 'jsonwebtoken'

function generateAccessToken(user: { userId: string }): string {
  return jwt.sign(user, 'your-secret-key', { expiresIn: '1d' })
}

function generateRefreshToken(user: { userId: string }): string {
  return jwt.sign(user, 'refresh-secret-key', { expiresIn: '7d' })
}

function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret)
}

export { generateAccessToken, generateRefreshToken, verifyToken }
