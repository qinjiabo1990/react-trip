import React from 'react'
import { UserLayout } from '../../layouts/userLayout'
import { SignInForm } from '../signIn/SignInForm'

export const SignIn: React.FC = () => {
	return (
		<UserLayout>
			<SignInForm />
		</UserLayout>
	)
}