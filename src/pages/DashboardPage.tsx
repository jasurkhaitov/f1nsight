import { useState } from 'react'

import Chat from '@/components/chat/Chat'
import Dashboard from '@/components/dashboard/Dashboard'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import ChatNavbar from '@/components/chat/ChatNavbar'

export default function DashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className='h-screen w-screen flex overflow-hidden'>
			<div
				className={`
          fixed lg:relative inset-y-0 left-0 z-60
          w-full sm:w-100 lg:w-[35%]
          transform transition-transform duration-300 ease-in-out
          ${
						isSidebarOpen
							? 'translate-x-0'
							: '-translate-x-full lg:translate-x-0'
					}
          border-r bg-background
        `}
			>
				<ChatNavbar setIsSidebarOpen={setIsSidebarOpen} />

				<Chat />
			</div>

			{isSidebarOpen && (
				<div
					className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-55'
					onClick={() => setIsSidebarOpen(false)}
				></div>
			)}

			<div className='flex-1 relative bg-background overflow-y-auto p-0 lg:pt-16 chat'>
				<DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />

				<Dashboard />
			</div>
		</div>
	)
}
