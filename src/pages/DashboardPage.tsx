import { CircleDollarSign, TrendingUp, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
	return (
		<section className='min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
					Dashboard
				</h1>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					<Card className='bg-card/80 backdrop-blur-sm border'>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<CardTitle className='text-sm font-medium text-muted-foreground'>
								Today's Spending
							</CardTitle>
							<Wallet className='h-5 w-5 text-blue-500' />
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>$42.35</p>
							<p className='text-xs text-muted-foreground'>↑ 12% from yesterday</p>
						</CardContent>
					</Card>

					<Card className='bg-card/80 backdrop-blur-sm border'>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<CardTitle className='text-sm font-medium text-muted-foreground'>
								Total Balance
							</CardTitle>
							<CircleDollarSign className='h-5 w-5 text-green-500' />
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>$3,245.90</p>
							<p className='text-xs text-muted-foreground'>Updated just now</p>
						</CardContent>
					</Card>

					<Card className='bg-card/80 backdrop-blur-sm border'>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<CardTitle className='text-sm font-medium text-muted-foreground'>
								AI Insights
							</CardTitle>
							<TrendingUp className='h-5 w-5 text-purple-500' />
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground'>
								Your food expenses are trending up 18% this week. Try setting a daily limit of $25.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}
