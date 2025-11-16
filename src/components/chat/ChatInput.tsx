import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function ChatInput() {
	return (
		<div className='border-b bg-background sticky bottom-0 z-50 w-full'>
			<div className='w-full'>
				<div className='border-t bg-background sticky bottom-0 p-4'>
					<div className='flex items-center gap-2'>
						<Input
							placeholder='Type a message...'
							className='flex-1'
						/>
						<Button
							size='icon'
							className='shrink-0'
						>
							<Send className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}