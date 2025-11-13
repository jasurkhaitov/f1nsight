import { CircleDollarSign } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useNavigate } from 'react-router-dom'

export default function BrowseHeader() {
	const navigate = useNavigate()
	return (
		<section className='relative overflow-hidden min-h-screen flex items-center justify-center'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='text-center lg:text-left'>
						<Badge className='mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/50'>
							<CircleDollarSign className='h-5 w-5 mr-1' />
							AI-Powered Financial Insights
						</Badge>
						<h1 className='text-4xl sm:text-5xl font-bold bg-linear-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight'>
							F1nsight
						</h1>
						<p className='text-base text-muted-foreground mb-8 m-auto max-w-2xl'>
							Track your spending with smart OCR, get AI-generated reports, and
							discover personalized financial insights to help you manage your
							money better.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
							<Button
								onClick={() => navigate('/login')}
								size='lg'
								className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
							>
								Get Started
							</Button>
						</div>
					</div>

					<div className='relative'>
						<div className='relative bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl xs:rounded-2xl p-4 xs:p-8 shadow-2xl border dark:border-border'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<Card className='p-4 bg-card/80 backdrop-blur-sm border'>
									<div className='flex items-center space-x-2 mb-2'>
										<div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
											💸
										</div>
										<span className='text-sm font-medium text-foreground'>
											Daily Spending
										</span>
									</div>
									<div className='text-2xl font-bold text-blue-600'>$42.35</div>
									<div className='flex items-center mt-1 text-xs text-muted-foreground'>
										<CircleDollarSign className='h-3 w-3 mr-1' />↑ 12% vs
										yesterday
									</div>
								</Card>

								<Card className='p-4 bg-card/80 backdrop-blur-sm border'>
									<div className='flex items-center space-x-2 mb-2'>
										<div className='w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
											🤖
										</div>
										<span className='text-sm font-medium text-foreground'>
											AI Insight
										</span>
									</div>
									<p className='text-sm text-muted-foreground mb-1'>
										Your food expenses increased by 18% this week.
									</p>
									<p className='text-sm text-foreground font-medium'>
										Try setting a limit of $25/day to stay within budget.
									</p>
								</Card>
							</div>

							<div className='absolute -top-2 -right-2 bg-linear-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full shadow-md'>
								<CircleDollarSign className='h-4 w-4' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
