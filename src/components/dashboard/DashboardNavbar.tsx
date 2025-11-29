import { useAuth } from '@/context/AuthContext'
import { Button } from '../ui/button'
import { ModeToggle } from '@/shared/ThemeToggle'
import { Bell, LogOut, SidebarOpenIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface DashboardNavbarProps {
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardNavbar({
	setIsSidebarOpen,
}: DashboardNavbarProps) {
	const navigate = useNavigate()
	const { logout } = useAuth()

	const handleLogout = () => {
		logout()
		toast.success('Logged out successfully')
		navigate('/login')
	}

	return (
		<div className='border-b pb-px'>
			<div className='flex px-4 justify-between items-center h-16'>
				<div className='flex lg:hidden items-center space-x-4'>
					<Button
						variant='outline'
						size='icon'
						onClick={() => setIsSidebarOpen(true)}
					>
						<SidebarOpenIcon className='h-[1.2rem] w-[1.2rem]' />
					</Button>
					<h2 className='hidden lg:block text-xl font-bold font-montserrat text-foreground'>
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

					<Button onClick={handleLogout} variant={'outline'} size={'icon'}>
						<LogOut />
					</Button>

					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
