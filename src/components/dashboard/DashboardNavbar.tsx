import { Button } from '../ui/button'
import { ModeToggle } from '@/shared/ThemeToggle'
import { Bell, SidebarOpenIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardNavbarProps {
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardNavbar({
	setIsSidebarOpen,
}: DashboardNavbarProps) {
	return (
		<nav className='border-b bg-background backdrop-blur-md fixed top-0 right-0 z-50 w-full lg:w-[60%]'>
			<div className='w-full px-4'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex lg:hidden items-center space-x-4'>
						<Button
							variant='outline'
							size='icon'
							onClick={() => setIsSidebarOpen(true)}
						>
							<SidebarOpenIcon className='h-[1.2rem] w-[1.2rem]' />
						</Button>
						<h2 className='hidden xs:block text-xl font-bold font-montserrat text-foreground'>
							F1nsight
						</h2>
					</div>

					<h2 className='hidden lg:block text-xl font-bold font-montserrat text-foreground'>
						F1nsight
					</h2>

					<div className='flex items-center space-x-3 sm:space-x-5'>
						<Link
							className='text-sm font-mono transition-all hover:underline hover:text-foreground text-muted-foreground'
							to={'/challenge'}
						>
							Budget Goal
						</Link>

						<Button variant='outline' size='icon'>
							<Bell className='h-[1.2rem] w-[1.2rem]' />
						</Button>

						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	)
}
