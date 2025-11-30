import { useEffect, useState } from 'react'
import { AlertCircle, Loader, TrendingUp } from 'lucide-react'
import { API_URL } from '@/api/url'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts'
import type { YearlyReportResponse } from '@/types/type'

export default function YearlyReports() {
	const [data, setData] = useState<YearlyReportResponse | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const chartColors = [
		'#3B82F6', // blue-500
		'#A855F7', // purple-500
		'#22C55E', // green-500
		'#F97316', // orange-500
		'#EC4899', // pink-500
		'#6366F1', // indigo-500
		'#EAB308', // yellow-500
		'#EF4444', // red-500
		'#14B8A6', // teal-500
		'#F59E0B', // amber-500
		'#8B5CF6', // violet-500
		'#10B981', // emerald-500
	]

	useEffect(() => {
		const fetchYearlyReport = async () => {
			try {
				const token = localStorage.getItem('token')
				const res = await fetch(`${API_URL}/reports/yearly`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})

				if (!res.ok) {
					throw new Error('Failed to fetch yearly report')
				}

				const json = await res.json()
				setData(json)
			} catch (err) {
				setError(String(err))
			} finally {
				setLoading(false)
			}
		}

		fetchYearlyReport()
	}, [])

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('uz-UZ', {
			style: 'currency',
			currency: 'UZS',
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const formatCurrencyCompact = (amount: number) => {
		if (amount >= 1000000) {
			return `${(amount / 1000000).toFixed(1)}M`
		} else if (amount >= 1000) {
			return `${(amount / 1000).toFixed(1)}K`
		}
		return amount.toFixed(0)
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[450px]'>
				<div className='flex flex-col items-center gap-3'>
					<Loader className='w-12 h-12 text-blue-500 animate-spin'></Loader>
					<p className='text-base'>Loading yearly report...</p>
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

	if (!data) return null

	const monthlyData = Object.entries(data.data.monthlyTotals).map(
		([month, amount], index) => ({
			month: month.charAt(0) + month.slice(1).toLowerCase(),
			amount: amount as number,
			color: chartColors[index % chartColors.length],
		})
	)

	const totalYear = monthlyData.reduce((sum, item) => sum + item.amount, 0)
	const monthsWithData = monthlyData.filter(item => item.amount > 0).length
	const averageMonthly = monthsWithData > 0 ? totalYear / monthsWithData : 0
	const maxMonth = monthlyData.reduce((max, item) =>
		item.amount > max.amount ? item : max
	)

	return (
		<>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-2xl font-semibold'>Yearly Report</h3>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
				<div className='bg-linear-to-br from-blue-500 to-blue-600 rounded-md p-4 text-white shadow'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-blue-100 text-sm font-medium'>
							Total Yearly Spending
						</span>
						<span className='font-bold'>UZS</span>
					</div>
					<div className='text-2xl font-bold'>{formatCurrency(totalYear)}</div>
				</div>

				<div className='bg-linear-to-br from-purple-500 to-purple-600 rounded-md p-4 text-white shadow-lg'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-purple-100 text-sm font-medium'>
							Monthly Average
						</span>
						<TrendingUp className='w-5 h-5 text-purple-100' />
					</div>
					<div className='text-2xl font-bold'>
						{formatCurrency(averageMonthly)}
					</div>
				</div>

				<div className='bg-linear-to-br from-green-500 to-green-600 rounded-md p-4 text-white shadow-lg'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-green-100 text-sm font-medium'>
							Highest Month
						</span>
						<span className='font-bold text-sm'>{maxMonth.month}</span>
					</div>
					<div className='text-2xl font-bold'>
						{formatCurrency(maxMonth.amount)}
					</div>
				</div>
			</div>

			<div className='bg-transparent border rounded-md shadow-lg p-6'>
				<h3 className='text-xl font-semibold mb-6'>Monthly Breakdown</h3>

				<div className='w-full h-96 mb-6'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={monthlyData}>
							<CartesianGrid strokeDasharray='3 3' opacity={0.3} />
							<XAxis
								dataKey='month'
								tick={{ fontSize: 12 }}
								angle={-45}
								textAnchor='end'
								height={80}
							/>
							<YAxis
								tick={{ fontSize: 12 }}
								tickFormatter={formatCurrencyCompact}
							/>
							<Tooltip
								formatter={(value: number) => formatCurrency(value)}
								contentStyle={{
									backgroundColor: 'rgba(255, 255, 255, 0.95)',
									border: '1px solid #e5e7eb',
									borderRadius: '8px',
								}}
							/>
							<Bar dataKey='amount' radius={[8, 8, 0, 0]}>
								{monthlyData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
					{monthlyData.map((item) => (
						<div
							key={item.month}
							className='flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800'
						>
							<div className='flex items-center gap-2'>
								<div
									className='w-3 h-3 rounded-full shrink-0'
									style={{ backgroundColor: item.color }}
								></div>
								<span className='font-medium text-sm'>{item.month}</span>
							</div>
							<span className='text-sm font-semibold'>
								{item.amount > 0 ? formatCurrencyCompact(item.amount) : '-'}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
