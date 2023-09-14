import { NextResponse } from 'next/server'
import User from '@/models/User'
import { STATUS_CODES } from '@/config/constants'
import connectMongoDB from '@/database/mongodb'

/**
 * Handles a POST request.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} The response object.
 */

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, firstName, lastName } = body

  console.log('body 😋', { body }, '')

  await connectMongoDB()

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: STATUS_CODES.BAD_REQUEST }
      )
    }

    const newUser = new User({ email, password, firstName, lastName })
    await newUser.save()

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: STATUS_CODES.CREATED }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    )
  }
}
