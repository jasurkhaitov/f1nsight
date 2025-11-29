import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import type { RegisterPayload } from '@/types/type'
import { useRegister } from '@/hooks/useAuth'
import { toast } from 'sonner'

export default function Register() {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const [formData, setFormData] = useState<RegisterPayload>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})

	const emptyInputs = Object.values(formData).some(value => value === '')

	const navigate = useNavigate()
	const registerMutation = useRegister()

	const handleRegister = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		registerMutation.mutate(formData, {
			onSuccess: () => {
				toast.success('Account created successfully ! ')
				navigate('/login')
			},
			onError: err => {
				toast.error(err.error.message)
			},
		})
	}

	return (
		<form className='space-y-4' onSubmit={handleRegister}>
			<div className='space-y-2'>
				<Label htmlFor='first_name'>
					<span className='text-red-500'>*</span>Name
				</Label>
				<Input
					autoComplete='off'
					id='first_name'
					type='text'
					placeholder='Enter your name'
					required
					value={formData.firstName}
					onChange={e =>
						setFormData({ ...formData, firstName: e.target.value })
					}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='last_name'>
					<span className='text-red-500'>*</span>Surname
				</Label>
				<Input
					autoComplete='off'
					id='last_name'
					type='text'
					placeholder='Enter your surname'
					required
					value={formData.lastName}
					onChange={e => setFormData({ ...formData, lastName: e.target.value })}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='email'>
					<span className='text-red-500'>*</span>Email
				</Label>
				<Input
					autoComplete='off'
					id='email'
					type='email'
					placeholder='Enter your email'
					required
					value={formData.email}
					onChange={e => setFormData({ ...formData, email: e.target.value })}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>
					<span className='text-red-500'>*</span>Password
				</Label>
				<div className='relative'>
					<Input
						autoComplete='off'
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Create a password (min. 8 characters)'
						required
						className='pr-10'
						value={formData.password}
						onChange={e =>
							setFormData({ ...formData, password: e.target.value })
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
				<p className='text-xs text-muted-foreground'>
					Must include uppercase, lowercase, number, and special character
				</p>
			</div>

			<Button
				type='submit'
				disabled={registerMutation.isPending || emptyInputs}
				className='w-full mt-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:cursor-not-allowed cursor-pointer'
			>
				{registerMutation.isPending ? 'Creating...' : 'Create Account'}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Link
					to='/login'
					className='text-primary hover:text-primary/80 font-medium transition-colors'
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}
