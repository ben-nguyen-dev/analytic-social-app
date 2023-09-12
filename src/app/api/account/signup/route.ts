import { NextResponse } from 'next/server'
/**
 * Handles a POST request.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} The response object.
 */

export async function POST(request: Request) {
  return NextResponse.json({ success: 'dddd' }, { status: 200 })
}
