import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { closeSheet, clearCurrentCheque } from '@/store/chequeSlice'
import { Separator } from '@/components/ui/separator'
import { Calendar, Building, CheckCircle2, Tag, HandCoins } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import notFound from '@/assets/notFound.png'

export default function ChequeResultSheet() {
	const dispatch = useAppDispatch()
	const { isSheetOpen, currentCheque } = useAppSelector(state => state.cheque)

	const handleClose = () => {
		dispatch(closeSheet())
		setTimeout(() => {
			dispatch(clearCurrentCheque())
		}, 300)
	}

	if (!currentCheque) return null

	const isInvalidCheque =
		(!currentCheque.merchantName || currentCheque.merchantName.trim() === '') &&
		(!currentCheque.items || currentCheque.items.length === 0) &&
		currentCheque.totalAmount === 0

	console.log(currentCheque)

	if (isInvalidCheque) {
		return (
			<Sheet open={isSheetOpen} onOpenChange={handleClose}>
				<SheetContent className='w-full sm:max-w-xl flex items-center justify-center'>
					<div className='text-center'>
						<img
							src={notFound}
							className='m-auto'
							alt='Not Found Image for Check'
						/>
						<p className='text-xl font-semibold mt-10 mb-2'>
							Cheque is not valid
						</p>
						<p className='text-muted-foreground'>
							The system could not recognize your cheque. Please try again.
						</p>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Sheet open={isSheetOpen} onOpenChange={handleClose}>
			<SheetContent className='w-full sm:max-w-xl overflow-y-auto'>
				<SheetHeader className='space-y-4 pb-6 border-b'>
					<div className='flex items-center gap-3'>
						<CheckCircle2 className='w-8 h-8 text-green-500' />

						<SheetTitle className='text-2xl'>Cheque Details</SheetTitle>
						<SheetDescription></SheetDescription>
					</div>
				</SheetHeader>

				<div className='space-y-5 px-5'>
					<div className='space-y-3'>
						<div className='flex items-center gap-3 px-3'>
							<Building className='w-5 h-5 text-muted-foreground' />

							<p className='text-xl font-semibold'>
								{currentCheque.merchantName}
							</p>
						</div>

						<div className='flex items-center gap-3 px-3'>
							<Calendar className='w-5 h-5 text-muted-foreground' />

							<p className='text-lg font-medium'>{currentCheque.chequeDate}</p>
						</div>
					</div>

					<Separator />

					<div className='space-y-4 px-1'>
						<h3 className='text-lg font-semibold flex items-center gap-2'>
							<HandCoins className='w-5 h-5' />
							Financial Details
						</h3>

						<div className='space-y-3 pl-8'>
							{currentCheque.subtotal && (
								<div className='flex items-baseline justify-between'>
									<span className='text-muted-foreground'>Subtotal</span>
									<span className='font-medium text-lg'>
										{currentCheque.subtotal} UZS
									</span>
								</div>
							)}

							<div className='flex items-baseline justify-between'>
								<span className='text-muted-foreground'>Service Fee</span>
								<span className='font-medium text-lg'>
									{currentCheque.serviceFee
										? `${currentCheque.serviceFee} UZS`
										: 'No service fee'}
								</span>
							</div>

							<div className='flex items-baseline justify-between'>
								<span className='text-muted-foreground'>Tax</span>
								<span className='font-medium text-lg'>
									{currentCheque.tax} UZS
								</span>
							</div>

							<Separator className='my-3' />

							<div className='flex items-baseline justify-between'>
								<span className='text-lg font-semibold'>Total Amount</span>
								<span className='text-2xl font-bold text-green-600 dark:text-green-400'>
									{currentCheque.totalAmount} UZS
								</span>
							</div>
						</div>
					</div>

					<Separator />

					<div className='space-y-4 px-1'>
						<h3 className='text-lg font-semibold flex items-center gap-2'>
							<Tag className='w-5 h-5' />
							Items ({currentCheque.items.length})
						</h3>

						<div className='space-y-4 pl-8'>
							{currentCheque.items.map((item, idx) => (
								<div key={idx} className='space-y-1'>
									<div className='flex items-baseline justify-between gap-4'>
										<span className='font-medium text-base'>
											{item.productName}
										</span>
										<span className='font-semibold text-lg whitespace-nowrap'>
											{item.price} UZS
										</span>
									</div>
									<p className='text-sm text-muted-foreground'>
										{item.category}
									</p>
									{idx < currentCheque.items.length - 1 && (
										<Separator className='mt-3' />
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
