import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginPayload } from '@/types/type'
import { useLogin } from '@/hooks/useAuth'

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [loginData, setLoginData] = useState<LoginPayload>({
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const login = useLogin()

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		console.log(loginData);
		login.mutate(loginData, {
			onSuccess: data => {
				localStorage.setItem('token', data.token)
				navigate('/dashboard')
			},
			onError: err => {
				console.log(err.message)
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
						className='absolute right-0 top-0 h-full px-3 py-2'
						onClick={() => setShowPassword(prev => !prev)}
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
				disabled={login.isPending}
				className='w-full mt-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
			>
				{login.isPending ? 'Logging in...' : 'Login'}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
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
