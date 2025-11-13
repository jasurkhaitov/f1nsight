import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		console.log('Login attempt:', { email, password })
		setTimeout(() => setIsLoading(false), 1000)
	}

	return (
		<main className='min-h-screen bg-linear-to-br from-background via-background to-accent/5 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Link
					to='/'
					className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8'
				>
					<ArrowLeft className='w-4 h-4' />
					<span className='text-sm'>Back to home</span>
				</Link>

				<div className='relative group'>
					<div className='absolute inset-0 bg-linear-to-r from-accent/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

					<div className='relative bg-card border border-border/50 backdrop-blur-sm rounded-md p-7 shadow-lg'>
						<form onSubmit={handleSubmit} className='space-y-5'>
							<div className='space-y-2'>
								<label
									htmlFor='email'
									className='text-sm mx-1 font-medium text-foreground'
								>
									Email
								</label>
								<input
									id='email'
									type='email'
									placeholder='you@example.com'
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
									className='w-full mt-1 px-4 py-2.5 bg-input border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all'
								/>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='password'
									className='text-sm mx-1 font-medium text-foreground'
								>
									Password
								</label>
								<div className='relative mt-1'>
									<input
										id='password'
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
										value={password}
										onChange={e => setPassword(e.target.value)}
										required
										className='w-full px-4 py-2.5 pr-12 bg-input border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
									>
										{showPassword ? (
											<EyeOff className='w-5 h-5' />
										) : (
											<Eye className='w-5 h-5' />
										)}
									</button>
								</div>
							</div>

							<Button
								type='submit'
								disabled={isLoading}
								className='w-full bg-linear-to-r from-primary to-primary hover:shadow-lg transition-all duration-300 py-2.5 mt-2'
							>
								{isLoading ? 'Signing in...' : 'Sign In'}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}
