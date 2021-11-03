import React from 'react'
import styles from './SignUp.module.css'
import { UserLayout } from '../../layouts/userLayout'
import { SignUpForm } from './SignUpForm'

export const SignUp : React.FC = () => {
  return(
    <UserLayout>
      <SignUpForm />
    </UserLayout>
  )
}