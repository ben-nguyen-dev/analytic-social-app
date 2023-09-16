import React from 'react'
import { Card, CardBody } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { Link } from '@nextui-org/link'

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card
        className="h-fit w-2/6 bg-background/60 dark:bg-default-100/50"
        isBlurred
        shadow="md"
      >
        <CardBody>
          <h1 className="font-weight mb-6 text-xl">Sign in to your account</h1>

          <form action="">
            <Input
              className="mb-4"
              type="email"
              variant="faded"
              label="Email"
              placeholder="name@company.com"
            />
            <Input
              className="mb-6"
              type="password"
              variant="faded"
              label="Password"
              placeholder="••••••••"
            />
            <div className="mb-6 flex justify-between">
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
