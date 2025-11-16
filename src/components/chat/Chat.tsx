import { useRef, useEffect } from 'react'
import { Bot, User } from 'lucide-react'
import { msg } from './msg'
import ChatInput from './ChatInput'
import EmptyMessage from './EmptyMessage'

export default function Chat() {
	const chatEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		})
	}

	return (
		<div className='flex flex-col h-screen bg-background pt-0 lg:pt-16'>
			<div className='flex-1 px-4 chat overflow-y-auto'>
				<div className='max-w-4xl mx-auto space-y-4 py-6'>
					{msg.length === 0 ? (
						<div className='flex items-center justify-center flex-1'>
							<EmptyMessage />
						</div>
					) : (
						msg.map((msg, idx) => (
							<div
								key={idx}
								className={`flex gap-3 ${
									msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
								}`}
							>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
										msg.role === 'user'
											? 'bg-linear-to-br from-emerald-500 to-teal-600'
											: 'bg-linear-to-br from-blue-500 to-purple-600'
									}`}
								>
									{msg.role === 'user' ? (
										<User className='h-4 w-4 text-white' />
									) : (
										<Bot className='h-4 w-4 text-white' />
									)}
								</div>

								<div
									className={`flex flex-col ${
										msg.role === 'user' ? 'items-end' : 'items-start'
									} max-w-[75%]`}
								>
									<div
										className={`rounded-2xl px-4 py-3 shadow-sm ${
											msg.role === 'user'
												? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-tr-sm'
												: 'bg-card rounded-tl-sm border'
										}`}
									>
										<p className='text-sm leading-relaxed whitespace-pre-wrap wrap-break-word'>
											{msg.content}
										</p>
									</div>
									<span className='text-xs text-slate-400 mt-1 px-1'>
										{formatTime(msg.timestamp)}
									</span>
								</div>
							</div>
						))
					)}
					<div ref={chatEndRef}></div>
				</div>
			</div>

			<ChatInput />
		</div>
	)
}
