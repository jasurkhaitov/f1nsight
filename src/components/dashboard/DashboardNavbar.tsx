import { useAuth } from '@/context/AuthContext'
import { Button } from '../ui/button'
import { ModeToggle } from '@/shared/ThemeToggle'
import { Bell, LogOut, SidebarOpenIcon, TimerIcon, TrendingUp, TrendingUpDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { API_URL } from '@/api/url'
import type { InsightResponse } from '@/types/type'
import { Badge } from '../ui/badge'

interface DashboardNavbarProps {
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardNavbar({
	setIsSidebarOpen,
}: DashboardNavbarProps) {
	const [notification, setNotification] = useState<InsightResponse | null>(null)

	const navigate = useNavigate()
	const { logout } = useAuth()

	const token = localStorage.getItem('token')

	const handleLogout = () => {
		logout()
		toast.success('Logged out successfully')
		navigate('/login')
	}

	useEffect(() => {
		const getNotification = async () => {
			try {
				const res = await fetch(`${API_URL}/reports/insights`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				const data = await res.json()
				setNotification(data)
			} catch (error) {
				toast.error(String(error))
			}
		}

		getNotification()
	}, [token])

	return (
		<div className='border-b fixed top-0 right-0 w-full lg:w-[65%] bg-background z-50'>
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

					<Popover>
						<PopoverTrigger asChild>
							<Button variant='outline' size='icon' className='relative'>
								<Bell className='h-[1.2rem] w-[1.2rem]' />

								{notification && (
									<span className='absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-background'></span>
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent align='end' className='w-100 mt-1 p-3 space-y-3'>
							{notification?.data ? (
								<>
									<p>{notification.data.summary}</p>
									<div className='flex pt-3 border-t items-center justify-between'>
										<Badge variant={'destructive'}># {notification.data.topCategory}</Badge>
										<p className='flex items-center gap-2'><TrendingUp/> {notification.data.trend}</p>
									</div>
									<p className='text-sm text-muted-foreground flex items-center gap-3'>
										{new Date(notification.timestamp).toLocaleString()}
									</p>
								</>
							) : (
								<p className='text-muted-foreground text-sm'>
									No notifications
								</p>
							)}
						</PopoverContent>
					</Popover>

					<Button onClick={handleLogout} variant={'outline'} size={'icon'}>
						<LogOut />
					</Button>

					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
