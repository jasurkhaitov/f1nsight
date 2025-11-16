import { Button } from '../ui/button'
import { Bot, SidebarClose } from 'lucide-react'

interface DashboardNavbarProps {
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatNavbar({ setIsSidebarOpen }: DashboardNavbarProps) {
	return (
		<nav className='border-b bg-background sticky top-0 z-50 w-full'>
			<div className='w-full px-4'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center gap-3'>
						<div className='w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
							<Bot className='h-5 w-5 text-white' />
						</div>
						<div>
							<h1 className='font-semibold text-base'>AI Assistant</h1>
							<p className='text-xs text-green-500'>Online</p>
						</div>
					</div>
					<div className='block lg:hidden'>
						<Button
							variant='outline'
							size='icon'
							onClick={() => setIsSidebarOpen(false)}
						>
							<SidebarClose className='h-[1.2rem] w-[1.2rem]' />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}
