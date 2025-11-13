import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/shared/ThemeToggle'
import { Link } from 'react-router-dom'

export default function BrowsePage() {
	return (
		<main className='min-h-screen bg-background flex flex-col'>
			<nav className='w-full border-b border-border bg-background/60 backdrop-blur-md fixed top-0 z-50'>
				<div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
					<Link to='/' className='text-2xl font-bold text-primary'>
						F1nsight
					</Link>

					<div className='flex items-center space-x-4'>
						<ModeToggle />
						<Link to='/login'>
							<Button>Login</Button>
						</Link>
					</div>
				</div>
			</nav>

			<section className='flex flex-1 items-center justify-center p-6'>
				<div className='w-full max-w-md text-center'>
					<h1 className='text-4xl font-bold text-primary'>F1nsight</h1>

					<Badge className='mb-3 mt-5' variant={'secondary'}>
						AI-Powered Financial Insights
					</Badge>

					<p className='text-base text-foreground mb-8 leading-relaxed'>
						Track your spending with smart OCR, get AI-generated reports, and
						discover personalized financial insights to help you manage your
						money better.
					</p>

					<Link to='/login'>
						<Button size='lg' className='w-full'>
							Get Started
						</Button>
					</Link>
				</div>
			</section>
		</main>
	)
}
