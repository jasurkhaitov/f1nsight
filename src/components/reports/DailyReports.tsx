import { useEffect, useState } from 'react'
import {
	TrendingUp,
	TrendingDown,
	Calendar,
	ShoppingBag,
	AlertCircle,
	Loader,
} from 'lucide-react'
import { API_URL } from '@/api/url'
import type { DailyReportData, DailyReportResponse } from '@/types/type'

export default function DailyReports() {
	const [data, setData] = useState<DailyReportData | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchDailyReport = async () => {
			try {
				const token = localStorage.getItem('token')
				const res = await fetch(`${API_URL}/reports/daily`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})

				if (!res.ok) {
					throw new Error('Failed to fetch daily report')
				}

				const json: DailyReportResponse = await res.json()
				setData(json.data)
			} catch (err) {
				setError(String(err))
			} finally {
				setLoading(false)
			}
		}

		fetchDailyReport()
	}, [])

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('uz-UZ', {
			style: 'currency',
			currency: 'UZS',
			maximumFractionDigits: 2,
		}).format(amount)
	}

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	}

	const getCategoryColor = (index: number) => {
		const colors = [
			'bg-blue-500',
			'bg-purple-500',
			'bg-green-500',
			'bg-orange-500',
			'bg-pink-500',
			'bg-indigo-500',
			'bg-yellow-500',
			'bg-red-500',
		]
		return colors[index % colors.length]
	}

	if (!data) return null

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[450px]'>
				<div className='flex flex-col items-center gap-3'>
					<Loader className='w-12 h-12 text-blue-500 animate-spin'></Loader>
					<p className='text-base'>Loading daily report...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col gap-3 items-center justify-center min-h-[450px]'>
				<AlertCircle className='text-red-600 w-18 h-18' />
				<h3 className='font-semibold'>Error Loading Report</h3>
			</div>
		)
	}


	const categoryEntries = Object.entries(data.categoryTotals).sort(
		(a, b) => b[1] - a[1]
	)
	const maxCategoryAmount = Math.max(...Object.values(data.categoryTotals), 1)

	return (
		<>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-2xl font-semibold mb-2'>Daily Report</h3>
				<div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm'>
					<Calendar className='w-3.5 h-3.5' />
					<span>{formatDate(data.startDate)}</span>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
				<div className='bg-linear-to-br from-blue-500 to-blue-600 rounded-md p-4 text-white shadow-lg'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-blue-100 text-sm font-medium'>
							Total Spent
						</span>
						<span className='font-bold'>UZS</span>
					</div>
					<div className='text-2xl font-bold'>
						{formatCurrency(data.totalSpent)}
					</div>
				</div>

				<div className='bg-linear-to-br from-purple-500 to-purple-600 rounded-md p-4 text-white shadow-lg'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-purple-100 text-sm font-medium'>
							Transactions
						</span>
						<ShoppingBag className='w-5 h-5 text-purple-100' />
					</div>
					<div className='text-2xl font-bold'>{data.transactionCount}</div>
				</div>

				<div className='bg-linear-to-br from-green-500 to-green-600 rounded-md p-4 text-white shadow-lg'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-green-100 text-sm font-medium'>
							vs Previous Period
						</span>
						{data.comparisonPercentage !== null &&
						data.comparisonPercentage > 0 ? (
							<TrendingUp className='w-5 h-5 text-green-100' />
						) : (
							<TrendingDown className='w-5 h-5 text-green-100' />
						)}
					</div>
					<div className='text-2xl font-bold'>
						{data.comparisonPercentage !== null
							? `${
									data.comparisonPercentage > 0 ? '+' : ''
							  }${data.comparisonPercentage.toFixed(1)}%`
							: '-'}
					</div>
				</div>
			</div>

			<div className='bg-transparent border rounded-md shadow-lg p-6'>
				<h3 className='text-xl font-semibold mb-4'>Spending by Category</h3>

				{categoryEntries.length === 0 ? (
					<div className='text-center py-12'>
						<div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<ShoppingBag className='w-8 h-8 text-gray-400' />
						</div>
						<p className='text-gray-600'>No transactions yet</p>
					</div>
				) : (
					<div className='space-y-4'>
						{categoryEntries.map(([category, amount], index) => {
							const percentage = (amount / data.totalSpent) * 100
							const barWidth = (amount / maxCategoryAmount) * 100

							return (
								<div key={category} className='group'>
									<div className='flex items-center justify-between mb-2'>
										<div className='flex items-center gap-3'>
											<div
												className={`w-3 h-3 rounded-full ${getCategoryColor(
													index
												)}`}
											></div>
											<span className='font-medium capitalize'>{category}</span>
										</div>
										<div className='flex items-center gap-4'>
											<span className='text-sm'>{percentage.toFixed(1)}%</span>
											<span className='font-semibold'>
												{formatCurrency(amount)}
											</span>
										</div>
									</div>
									<div className='w-full rounded-full h-2 overflow-hidden'>
										<div
											className={`h-full ${getCategoryColor(
												index
											)} transition-all duration-500 ease-out`}
											style={{ width: `${barWidth}%` }}
										></div>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</>
	)
}
