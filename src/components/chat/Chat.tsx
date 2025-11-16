/* eslint-disable react-hooks/purity */
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bot, Send, User } from 'lucide-react'

export default function Chat() {
	const [messages, setMessages] = useState<
		{ role: 'user' | 'ai'; content: string; timestamp: Date }[]
	>([
		{
			role: 'ai',
			content: 'Hello! I am your AI assistant. How can I help you today?',
			timestamp: new Date(Date.now() - 3600000),
		},
		{
			role: 'user',
			content: 'Hi! Can you summarize my recent spending?',
			timestamp: new Date(Date.now() - 3540000),
		},
		{
			role: 'ai',
			content: 'You spent $120 on groceries and $45 on transport last week.',
			timestamp: new Date(Date.now() - 3480000),
		},
		{
			role: 'ai',
			content: 'You spent $120 on groceries and $45 on transport last week.',
			timestamp: new Date(Date.now() - 3480000),
		},
		{
			role: 'ai',
			content: 'You spent $120 on groceries and $45 on transport last week.',
			timestamp: new Date(Date.now() - 3480000),
		},
		{
			role: 'ai',
			content: 'You spent $120 on groceries and $45 on transport last week.',
			timestamp: new Date(Date.now() - 3480000),
		},
		{
			role: 'user',
			content: 'What about entertainment expenses?',
			timestamp: new Date(Date.now() - 3420000),
		},
		{
			role: 'ai',
			content:
				'Your entertainment spending was $85, including streaming services ($15) and dining out ($70).',
			timestamp: new Date(Date.now() - 3360000),
		},
	])
	const [input, setInput] = useState('')
	const chatEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		})
	}

	const handleSendMessage = () => {
		if (!input.trim()) return
		setMessages(prev => [
			...prev,
			{
				role: 'user',
				content: input,
				timestamp: new Date(),
			},
		])
		setInput('')

		setTimeout(() => {
			setMessages(prev => [
				...prev,
				{
					role: 'ai',
					content: `I received your message: "${input}". This is a simulated AI response.`,
					timestamp: new Date(),
				},
			])
		}, 800)
	}

	return (
		<div className='flex flex-col h-screen bg-background pt-16'>
			<div className='flex-1 px-4 chat overflow-y-auto'>
				<div className='max-w-4xl mx-auto space-y-4 py-6'>
					{messages.map((msg, idx) => (
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
					))}
					<div ref={chatEndRef}></div>
				</div>
			</div>

			<div className='border-t border-r bg-background sticky bottom-0 p-4 w-full'>
				<div className='flex items-center gap-2'>
					<Input
						placeholder='Type a message...'
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
						className='flex-1'
					/>
					<Button onClick={handleSendMessage} size='icon' className='shrink-0'>
						<Send className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	)
}
