import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChartNoAxesCombined, Send, X } from 'lucide-react'
import { useState } from 'react'

export default function ChatInput() {
	const [active, setActive] = useState(false)

	return (
		<div className='border-t border-r bg-background sticky bottom-0 p-4 w-full'>
			<div className='flex items-center gap-2'>
				<Button
					variant='outline'
					onClick={() => setActive(!active)}
					className={`
						group relative flex items-center gap-2
						${
							active
								? 'border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500'
								: ''
						}
					`}
				>
					{!active && <ChartNoAxesCombined className='w-4 h-4' />}
					{active && (
						<ChartNoAxesCombined className='w-4 h-4 group-hover:hidden' />
					)}
					{active && <X className='w-4 h-4 hidden group-hover:block' />}
					In chart
				</Button>

				<Input placeholder='Type a message...' className='flex-1' />

				<Button size='icon'>
					<Send className='h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
