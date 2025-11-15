import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Chat from '@/components/chat/Chat'
import Dashboard from '@/components/dashboard/Dashboard'

export default function DashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className='h-screen w-screen flex overflow-hidden'>
			<Button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				variant='outline'
				size='icon'
				className='lg:hidden fixed top-4 left-4 z-50'
			>
				{isSidebarOpen ? (
					<X className='w-6 h-6' />
				) : (
					<Menu className='w-6 h-6' />
				)}
			</Button>

			<div
				className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-full sm:w-80 lg:w-[30%]
          transform transition-transform duration-300 ease-in-out
          ${
						isSidebarOpen
							? 'translate-x-0'
							: '-translate-x-full lg:translate-x-0'
					}
          border-r bg-card
        `}
			>
				<Chat />
			</div>

			{isSidebarOpen && (
				<div
					className='lg:hidden fixed inset-0 bg-black/50 z-30'
					onClick={() => setIsSidebarOpen(false)}
				></div>
			)}

			<div className='flex-1 overflow-hidden bg-background'>
				<Dashboard />
			</div>
		</div>
	)
}
