import Mem from '../../assets/mem.webp'

export default function EmptyMessage() {
	return (
		<div className='flex mt-5 flex-col items-center text-center'>
			<img
				src={Mem}
				alt='Empty chat meme'
				className='w-52 h-auto rounded-lg mb-4'
			/>

			<h2 className='text-2xl font-bold mb-1'>Welcome to Chat</h2>

			<p className='text-base mb-4 font-medium'>
				No messages yet - start your first one!
			</p>

			<ul className='text-sm text-start text-green-500 space-y-1'>
				<li className='font-mono font-semibold'>
					• Summaries from receipts (OCR)
				</li>
				<li className='font-mono font-semibold'>
					• Spending insights & reports
				</li>
				<li className='font-mono font-semibold'>
					• Forecast & budget tracking
				</li>
				<li className='font-mono font-semibold'>• Shopping help & tips</li>
			</ul>
		</div>
	)
}
