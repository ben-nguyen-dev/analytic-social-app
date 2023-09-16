'use client'

import React, { useState } from 'react'
import { Card, CardBody } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { Link } from '@nextui-org/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/icons'
import { useMutation } from '@tanstack/react-query'
import authService, { ISignUpBody } from '@/libs/axios/auth'
import toast from 'react-hot-toast'
import { getMessageError } from '@/utils'
import { useRouter } from 'next/navigation'

interface IFormValues {
  email: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Your passwords do not match.')
      .required('Confirm password is required'),
  })
  .required()

export default function SignIn() {
  const route = useRouter()

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async (body: ISignUpBody) => {
      return await authService.singUp(body)
    },
    onSuccess: (data: any) => {
      toast.success(data.message)
      route.push('/sign-in')
    },
    onError: (error: any) => {
      toast.error(getMessageError(error))
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = (data: IFormValues) => {
    const body = {
      email: data.email,
      password: data.password,
    }
    signUp(body)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card
        className="h-fit w-96 bg-background/60 dark:bg-default-100/50"
        isBlurred
        shadow="md"
      >
        <CardBody>
          <h1 className="font-weight mb-6 text-xl">Create an account</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              className="mb-4"
              placeholder="email"
              maxLength={250}
              validationState={errors.email?.message ? 'invalid' : 'valid'}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              className="mb-4"
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              label="Password"
              placeholder="password"
              maxLength={250}
              validationState={errors.password?.message ? 'invalid' : 'valid'}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              errorMessage={errors.password?.message}
              {...register('password')}
            />
            <Input
              className="mb-4"
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              label="Confirm password"
              placeholder="password"
              maxLength={250}
              validationState={
                errors.confirmPassword?.message ? 'invalid' : 'valid'
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Checkbox className="mb-6">
              <p>
                I accept the <Link href={'/sign-up'}>Terms and Conditions</Link>
              </p>
            </Checkbox>
            <Button
              className="mb-4 w-full"
              color="primary"
              variant="shadow"
              type="submit"
              isDisabled={!isValid}
              isLoading={isLoading}
            >
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
