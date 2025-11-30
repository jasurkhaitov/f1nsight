import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Calendar,
	CalendarDays,
	CalendarRange,
	CalendarClock,
	Columns3Cog,
} from 'lucide-react'
import YearlyReports from '../reports/YearlyReports'
import MonthlyReports from '../reports/MonthlyReports'
import WeeklyReports from '../reports/WeeklyReports'
import DailyReports from '../reports/DailyReports'
import CustomReports from '../reports/CustomReports'

export default function ReportTabs() {
	const [activeTab, setActiveTab] = useState(
		() => localStorage.getItem('report-active-tab') || 'day'
	)

	const handleChange = (value: string) => {
		setActiveTab(value)
		localStorage.setItem('report-active-tab', value)
	}

	return (
		<div className='mt-5'>
			<Tabs value={activeTab} onValueChange={handleChange}>
				<TabsList className='grid w-full grid-cols-5 h-auto p-1'>
					<TabsTrigger
						value='day'
						className='flex items-center gap-2 py-3 px-4'
					>
						<Calendar className='w-4 h-4' />
						<span className='font-medium'>Daily</span>
					</TabsTrigger>

					<TabsTrigger
						value='week'
						className='flex items-center gap-2 py-3 px-4'
					>
						<CalendarDays className='w-4 h-4' />
						<span className='font-medium'>Weekly</span>
					</TabsTrigger>

					<TabsTrigger
						value='month'
						className='flex items-center gap-2 py-3 px-4'
					>
						<CalendarRange className='w-4 h-4' />
						<span className='font-medium'>Monthly</span>
					</TabsTrigger>

					<TabsTrigger
						value='year'
						className='flex items-center gap-2 py-3 px-4'
					>
						<CalendarClock className='w-4 h-4' />
						<span className='font-medium'>Yearly</span>
					</TabsTrigger>
					<TabsTrigger
						value='custom'
						className='flex items-center gap-2 py-3 px-4'
					>
						<Columns3Cog className='w-4 h-4' />
						<span className='font-medium'>Custom</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value='day' className='mt-2'>
					<div className='p-6 rounded-lg border'>
						<DailyReports />
					</div>
				</TabsContent>

				<TabsContent value='week' className='mt-2'>
					<div className='p-6 rounded-lg border'>
						<WeeklyReports />
					</div>
				</TabsContent>

				<TabsContent value='month' className='mt-2'>
					<div className='p-6 rounded-lg border'>
						<h3 className='text-lg font-semibold mb-2'>Monthly Report</h3>
						<MonthlyReports />
					</div>
				</TabsContent>

				<TabsContent value='year' className='mt-2'>
					<div className='p-6 rounded-lg border'>
						<h3 className='text-lg font-semibold mb-2'>Yearly Report</h3>
						<YearlyReports />
					</div>
				</TabsContent>
				<TabsContent value='custom' className='mt-2'>
					<div className='p-6 rounded-lg border'>
						<h3 className='text-lg font-semibold mb-2'>Custom</h3>
						<CustomReports />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
