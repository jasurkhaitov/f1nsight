import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginPayload } from '@/types/type'
import { useLogin } from '@/hooks/useAuth'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [loginData, setLoginData] = useState<LoginPayload>({
		email: '',
		password: '',
	})

	const emptyInputs = Object.values(loginData).some(value => value === '')

	const navigate = useNavigate()
	const loginMutation = useLogin()
	const { login } = useAuth()

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (loginMutation.isPending) return

		loginMutation.mutate(loginData, {
			onSuccess: response => {
				login(response.data.token, response.data.refreshToken)

				toast.success('Welcome back !')
				navigate('/dashboard')
			},
			onError: err => {
				toast.error(err.error.message)
			},
		})
	}

	return (
		<form onSubmit={handleLogin} className='space-y-5'>
			<div className='space-y-2'>
				<Label htmlFor='email'>
					<span className='text-red-500'>*</span>Email
				</Label>
				<Input
					autoComplete='email'
					id='email'
					type='email'
					placeholder='Enter your email'
					required
					value={loginData.email}
					onChange={e => setLoginData({ ...loginData, email: e.target.value })}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>
					<span className='text-red-500'>*</span>Password
				</Label>
				<div className='relative'>
					<Input
						autoComplete='current-password'
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						required
						className='pr-10'
						value={loginData.password}
						onChange={e =>
							setLoginData({ ...loginData, password: e.target.value })
						}
					/>

					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
						onClick={() => setShowPassword(prev => !prev)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{showPassword ? (
							<EyeOff className='h-4 w-4 text-muted-foreground' />
						) : (
							<Eye className='h-4 w-4 text-muted-foreground' />
						)}
					</Button>
				</div>
			</div>

			<Button
				type='submit'
				disabled={loginMutation.isPending || emptyInputs}
				className='w-full mt-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:cursor-not-allowed cursor-pointer'
			>
				{loginMutation.isPending ? (
					<Loader className='animate-spin' />
				) : (
					'Login'
				)}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Don't have an account?{' '}
				<Link
					to='/register'
					className='text-primary hover:text-primary/80 font-medium transition-colors'
				>
					Sign up
				</Link>
			</p>
		</form>
	)
}
