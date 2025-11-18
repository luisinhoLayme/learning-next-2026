"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateForm } from '@/helpers/handle-validations'
import { FormState } from '@/intefaces/auth-state'
import { Form } from '@/intefaces/validate-form'
import { registerUserService } from '@/lib/strapi'

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  httpOnly: true,
  domain: process.env.HOST ?? 'localhost',
  secure: process.env.NODE_ENV === 'production'
}

export const registerUserAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  console.log('Register User Form Action')

  const fields = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  }

  const form: Form = {
    name: {
      value: fields.fullName,
      rules: {
        required: true,
        minLength: 3
      }
    },
    email: {
      value: fields.email,
      rules: {
        required: true,
        email: true
      }
    },
    password: {
      value: fields.password,
      rules: {
        required: true,
        minLength: 8,
        password: true
      }
    },
    confirmPassword: {
      value: fields.confirmPassword,
      rules: {
        required: true,
        minLength: 8,
      }
    },
  };

  const errors = await validateForm(form)
  if (Object.keys(errors).length > 0) {
    console.log('validation errors: ', errors)
    return {
      success: false,
      message: 'Validation error',
      strapiErrors: null,
      data: fields,
      errors
    }
  }

  const userData = {username: fields.fullName, email: fields.email, password: fields.password}

  const response = await registerUserService(userData)

  if (!response || response.error) {
    return {
      success: false,
      message: 'Registration Error',
      strapiErrors: response?.error,
      data: fields,
      errors: null
    }
  }

  // return {
  //   success: true,
  //   message: 'Validation successful',
  //   strapiErrors: null,
  //   data: fields,
  //   errors: null
  // }

  const cookieStore = await cookies()
  cookieStore.set('jwt', response.jwt, cookieConfig)
  redirect('/dashboard')
}

