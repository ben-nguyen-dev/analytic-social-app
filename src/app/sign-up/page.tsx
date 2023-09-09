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
          <h1 className="font-weight mb-6 text-xl">Create an account</h1>

          <form action="">
            <Input
              className="mb-4"
              type="email"
              variant="faded"
              label="Your email"
              placeholder="name@company.com"
            />
            <Input
              className="mb-4"
              type="password"
              variant="faded"
              label="Password"
              placeholder="••••••••"
            />
            <Input
              className="mb-4"
              type="password"
              variant="faded"
              label="Confirm password"
              placeholder="••••••••"
            />
            <Checkbox className="mb-6">
              <p>
                I accept the <Link href={'/sign-up'}>Terms and Conditions</Link>
              </p>
            </Checkbox>
            <Button className="mb-4 w-full" color="primary" variant="shadow">
              Create an account
            </Button>
          </form>

          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium hover:underline">
              Login here
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
