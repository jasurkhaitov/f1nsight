import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { closeSheet, clearCurrentCheque } from '@/store/chequeSlice'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FileText, Calendar, DollarSign, Building } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hook'

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

	console.log(currentCheque)

	return (
		<Sheet open={isSheetOpen} onOpenChange={handleClose}>
			<SheetContent className='w-full sm:max-w-xl overflow-y-auto'>
				<SheetHeader>
					<SheetTitle className='text-2xl'>Cheque Details</SheetTitle>
					<SheetDescription>
						Extracted information from the uploaded cheque
					</SheetDescription>
				</SheetHeader>

				<div className='mt-6 space-y-6'>
					{/* File Info */}
					<div className='rounded-lg border p-4 bg-muted/30'>
						<div className='flex items-start gap-3'>
							<FileText className='w-5 h-5 text-muted-foreground mt-0.5' />
							<p className='text-sm font-medium mb-1'>File Information</p>
						</div>
					</div>

					<Separator />

					{/* Cheque Data */}
					<div className='space-y-4'>
						<h3 className='font-semibold text-lg'>Extracted Data</h3>

						<div className='space-y-3'>
							<DataRow
								icon={<Building className='w-5 h-5' />}
								label='Merchant Name'
								value={currentCheque.merchantName}
							/>

							<DataRow
								icon={<Calendar className='w-5 h-5' />}
								label='Cheque Date'
								value={currentCheque.chequeDate}
							/>

							<DataRow
								icon={<DollarSign className='w-5 h-5' />}
								label='Subtotal'
								value={`$${currentCheque.subtotal}`}
							/>

							<DataRow
								icon={<DollarSign className='w-5 h-5' />}
								label='Service Fee'
								value={
									currentCheque.serviceFee
										? `$${currentCheque.serviceFee}`
										: 'No service fee'
								}
							/>

							<DataRow
								icon={<DollarSign className='w-5 h-5' />}
								label='Tax'
								value={`$${currentCheque.tax}`}
							/>

							<DataRow
								icon={<DollarSign className='w-5 h-5' />}
								label='Total Amount'
								value={`$${currentCheque.totalAmount}`}
							/>
						</div>
					</div>

					<Separator />

					{/* Items List */}
					<div>
						<h3 className='font-semibold text-lg mb-3'>Items</h3>

						<div className='space-y-3'>
							{currentCheque.items.map((item, idx) => (
								<div
									key={idx}
									className='rounded-md border p-3 bg-card flex justify-between'
								>
									<div>
										<p className='font-medium'>{item.productName}</p>
										<p className='text-xs text-muted-foreground'>
											{item.category}
										</p>
									</div>
									<p className='font-semibold'>${item.price}</p>
								</div>
							))}
						</div>
					</div>

					<Separator />

					{/* Actions */}
					<div className='flex gap-3'>
						<Button variant='outline' onClick={handleClose} className='flex-1'>
							Close
						</Button>
						<Button className='flex-1'>Download Report</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

function DataRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode
	label: string
	value: string
}) {
	return (
		<div className='flex items-start gap-3 p-3 rounded-md border bg-card'>
			<div className='text-muted-foreground mt-0.5'>{icon}</div>
			<div className='flex-1 min-w-0'>
				<p className='text-xs text-muted-foreground mb-1'>{label}</p>
				<p className='font-medium break-all'>{value}</p>
			</div>
		</div>
	)
}
