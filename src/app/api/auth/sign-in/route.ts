import { NextResponse } from 'next/server'
import User from '@/models/User'
import { STATUS_CODES } from '@/config/constants'
import connectMongoDB from '@/libs/mongodb'
import bcrypt from 'bcryptjs'
import user from '@/models/User'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '@/libs/jwt'
import { IUser } from '@/types'

/**
 * Handles a POST request.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} The response object.
 */

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  await connectMongoDB()

  try {
    const existingUser: IUser | null = await User.findOne({ email })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: STATUS_CODES.UNAUTHORIZED }
      )
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: STATUS_CODES.UNAUTHORIZED }
      )
    }

    const accessToken = generateAccessToken({ userId: existingUser._id })
    const refreshToken = generateRefreshToken({ userId: existingUser._id })

    return NextResponse.json(
      { accessToken, refreshToken },
      { status: STATUS_CODES.ACCEPTED }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    )
  }
}
