import jwt from 'jsonwebtoken'

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'ctWm7I4vjlCVR1Q3n9YbCOIcLvMWJdDXRwQAVUP9tw8=',
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION || '1d',
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET || '+/hMbmIaZtax/gtHCJs4W64OTQbpF3euAgNTFR0s6Fc='
}

const generateToken = (data: any) => {
  return jwt.sign(data, jwtConfig.secret as string, { expiresIn: jwtConfig.expirationTime })
}

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    return decoded
  } catch (error) {
    return null
  }
}

export { generateToken, verifyToken }
