'use client'

import { LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoCheckCircleFill } from 'react-icons/go'
import slugify from 'slugify'
import { toast } from 'sonner'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { trpc } from '@/trpc/client'

import { SignUpFormData, SignUpFormSchema } from './validator'

const SignUpForm: React.FC = () => {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [emailSentTo, setEmailSentTo] = useState<string>('')

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form

  const {
    mutate: signUpMutation,
    isPending: isSignUpPending,
    isError: isSignUpError,
    error: signUpError,
    isSuccess: isSignUpSuccess,
  } = trpc.auth.signUp.useMutation({
    onSuccess: data => {
      reset()
      setIsEmailSent(true)
      setEmailSentTo(data.email)
    },
    onError: () => {
      toast.error('Unable to create an account, try again!')
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    const randomNum = Math.floor(Math.random() * (24 - 1 + 1)) + 1
    const avatar = `/images/avatar/avatar_${randomNum}.jpg`

    const { confirmPassword, ...userData } = data

    signUpMutation({
      ...userData,
      avatar,
    })
  }

  return (
    <div className='flex w-full items-center justify-center'>
      {isEmailSent ? (
        <>
          <div className='mx-auto  text-center'>
            <div className='mx-auto flex w-fit gap-4 rounded-md bg-base-200 p-4'>
              <GoCheckCircleFill className='text-cq-success size-6 shrink-0 items-start' />
              <div className='text-left font-semibold'>
                Email has been sent to{' '}
                <code className='bg-cq-background rounded-sm px-2 py-1'>
                  {emailSentTo}
                </code>
                <span className='text-cq-text-secondary mt-1 block font-normal'>
                  You can close this window now.
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full max-w-md p-6'>
          {isSignUpSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                Successfully signed up ! please verify your email
              </AlertDescription>
            </Alert>
          ) : isSignUpError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                Sign up failed. Check the details you provided.
              </AlertDescription>
            </Alert>
          ) : null}
          <h1 className='mb-6 text-center text-3xl font-semibold text-base-content'>
            Sign Up
          </h1>
          <h1 className='mb-6 text-center text-sm font-semibold text-base-content'>
            Join to Our Community with all time access and free{' '}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-base-content/70'>
                    Username
                  </label>
                  {errors?.username && (
                    <p className='text-sm text-error'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('username', {
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = slugify(event.target.value, {
                        remove: /[*+~.()'"!:@]/g,
                        lower: true,
                        strict: true,
                        locale: 'en',
                        trim: false,
                      })
                      setValue('username', value, { shouldValidate: true })
                    },
                  })}
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Doe'
                />
              </LabelInputContainer>
            </div>

            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-base-content/70'>
                    E-Mail
                  </label>
                  {errors?.email && (
                    <p className='text-sm text-error'>{errors.email.message}</p>
                  )}
                </div>
                <Input
                  {...register('email')}
                  type='text'
                  id='email'
                  name='email'
                  placeholder='john.doe@example.com'
                />
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-8'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-base-content/70'>
                    Password
                  </label>
                  {errors?.password && (
                    <p className='text-sm text-error'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                />
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-8'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-base-content/70'>
                    Confirm Password
                  </label>
                  {errors?.confirmPassword && (
                    <p className='text-sm text-error'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('confirmPassword')}
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='● ● ● ● ● ● ● ● ●'
                />
              </LabelInputContainer>
            </div>
            <div>
              <Button
                className='w-full'
                type='submit'
                disabled={isSignUpPending}>
                {isSignUpPending ? 'Creating account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm text-base-content/70'>
            <p>
              Already have an account?{' '}
              <a href='/sign-in' className='text-base-content hover:underline'>
                SignIn here
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUpForm
