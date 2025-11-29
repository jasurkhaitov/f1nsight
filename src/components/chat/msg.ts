export const msg: Message[] = [
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
		content: 'Hdsfgsdgdsfg dsghsdfg dfgdsf  dg fffffffg gfdg  dfgdgsdg oday?',
		timestamp: new Date(Date.now() - 3600000),
	},
]

export interface Message {
	role: 'user' | 'ai'
	content: string
	timestamp: Date
}
