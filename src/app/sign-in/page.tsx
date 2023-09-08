import React from 'react'
import { Card, CardBody } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { Link } from '@nextui-org/link'

export default function SignIn() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card
        className="bg-background/60 dark:bg-default-100/50 h-fit w-2/6"
        isBlurred
        shadow="md"
      >
        <CardBody>
          <h1 className="font-weight mb-6">Sign in to your account</h1>

          <form action="">
            <Input
              className="mb-4"
              type="email"
              variant="faded"
              label="Email"
              placeholder="name@company.com"
            />
            <Input
              className="mb-8"
              type="password"
              variant="faded"
              label="Password"
              placeholder="••••••••"
            />
            <div className="flex justify-between mb-6">
              <Checkbox>
                <p>Remember me</p>
              </Checkbox>
              <Link href={'/sign-in'}>Forgot password?</Link>
            </div>
            <Button className="mb-4 w-full" color="primary" variant="shadow">
              Sign in
            </Button>
          </form>

          <p className="text-sm">
            Don’t have an account yet?{' '}
            <Link href="/sign-up" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
