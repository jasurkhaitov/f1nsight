import { useState } from 'react'
import Chat from '@/components/chat/Chat'
import Dashboard from '@/components/dashboard/Dashboard'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import ChatNavbar from '@/components/chat/ChatNavbar'
import ChequeResultSheet from '@/components/dashboard/ChequeResultSheet'

export default function DashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className='h-screen w-screen flex'>
			<div
				className={`
          fixed lg:relative inset-y-0 left-0 lg:z-0 z-60 
          w-full sm:w-150 lg:w-[35%] 
          transform transition-transform duration-300 ease-in-out 
          overflow-hidden border-r bg-background
          ${
						isSidebarOpen
							? 'translate-x-0'
							: '-translate-x-full lg:translate-x-0'
					}
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

			<div className='flex-1 bg-background h-screen flex flex-col'>
				<DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
				<div className='flex-1 overflow-y-auto'>
					<Dashboard />
				</div>
			</div>

			<ChequeResultSheet />
		</div>
	)
}
