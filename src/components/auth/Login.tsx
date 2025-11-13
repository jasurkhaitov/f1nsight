import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

export default function Login() {

	const [showPassword, setShowPassword] = useState(false)

	const navigate = useNavigate()

	return (
		<form className='space-y-5'>
			<div className='space-y-2'>
				<Label htmlFor='email'><span className='text-red-500'>*</span>Email</Label>
				<Input
					id='email'
					type='email'
					placeholder='Enter your email'
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'><span className='text-red-500'>*</span>Password</Label>
				<div className='relative'>
					<Input
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						required
						className='pr-10'
					/>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2'
						onClick={() => setShowPassword(!showPassword)}
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
			onClick={() => navigate('/dashboard')}
				className='w-full mt-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
			>Login
			</Button>
		</form>
	)
}
