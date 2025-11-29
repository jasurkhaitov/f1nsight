import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { LifeLine } from 'react-loading-indicators'

type FileUploadStatus = 'idle' | 'uploading' | 'error'

interface CheckUploadProps {
	onUpload: (file: File) => void
	isUploading: boolean
}

export default function CheckUpload({
	onUpload,
	isUploading,
}: CheckUploadProps) {
	const [file, setFile] = useState<File | null>(null)
	const [status, setStatus] = useState<FileUploadStatus>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [showModal, setShowModal] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const validateFile = (f: File) => {
		const maxSize = 3 * 1024 * 1024
		const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

		if (!allowedTypes.includes(f.type)) {
			setErrorMessage('Please upload a JPG or PNG image')
			return false
		}
		if (f.size > maxSize) {
			setErrorMessage('File size must be less than 3MB')
			return false
		}
		return true
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		const droppedFiles = e.dataTransfer.files
		if (droppedFiles && droppedFiles[0]) {
			const droppedFile = droppedFiles[0]
			if (validateFile(droppedFile)) {
				setFile(droppedFile)
				setErrorMessage('')
				setStatus('idle')
				setShowModal(true)
			} else {
				setStatus('error')
			}
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0]
			if (validateFile(selectedFile)) {
				setFile(selectedFile)
				setErrorMessage('')
				setStatus('idle')
				setShowModal(true)
			} else {
				setStatus('error')
			}
		}
	}

	const handleUpload = () => {
		if (!file) return
		setShowModal(false)
		onUpload(file)
	}

	const handleReset = () => {
		setFile(null)
		setStatus('idle')
		setErrorMessage('')
		setShowModal(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className='w-full'>
			<input
				ref={fileInputRef}
				type='file'
				onChange={handleInputChange}
				className='hidden'
				accept='.jpg,.jpeg,.png'
				aria-label='File upload input'
				disabled={isUploading}
			/>

			{status === 'idle' || (status === 'error' && !file) ? (
				<div className='grid md:grid-cols-2 gap-4'>
					<div
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
						className={`rounded-md p-5 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-dashed ${
							isUploading ? 'opacity-50 pointer-events-none' : ''
						}`}
					>
						<div className='space-y-3'>
							<h3 className='text-2xl font-bold mb-3'>Drag & Drop</h3>
							<p>Drop your cheque image here to upload</p>
							<p className='text-sm'>Supported: PNG, JPG</p>
							<p className='text-xs mt-1'>Max size: 3 MB</p>
						</div>
					</div>

					<div className='rounded-md p-5 flex flex-col items-center justify-center text-center border-2'>
						<div className='space-y-3'>
							<h3 className='text-2xl font-bold mb-3'>Browse Files</h3>
							<p className='mb-3'>Choose a cheque image from your device</p>
							<Button
								onClick={() => fileInputRef.current?.click()}
								variant={'outline'}
								disabled={isUploading}
							>
								Choose File
							</Button>
							<p className='text-sm'>Supported: PNG, JPG</p>
							<p className='text-xs mt-3'>Max size: 3MB</p>
						</div>
					</div>
				</div>
			) : null}

			{status === 'error' && file && (
				<div className='rounded-md p-10 border text-center'>
					<div className='space-y-6'>
						<div className='flex justify-center'>
							<div className='w-14 h-14 bg-red-500 rounded-full flex items-center justify-center'>
								<AlertCircle className='w-7 h-7 text-red-200' strokeWidth={2} />
							</div>
						</div>
						<div>
							<h3 className='text-2xl font-bold mb-2'>Upload Failed</h3>
							<p className='text-red-600 mb-6'>{errorMessage}</p>
						</div>
						<Button onClick={handleReset} disabled={isUploading}>
							Try Again
						</Button>
					</div>
				</div>
			)}

			<Dialog open={showModal} onOpenChange={setShowModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Upload</DialogTitle>
					</DialogHeader>
					{file && (
						<div className='space-y-4'>
							<div className='flex items-start justify-between'>
								<div>
									<h3 className='text-sm mb-1'>Selected File</h3>
									<p className='text-xl font-bold wrap-break-words'>
										{file.name}
									</p>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4 text-sm pt-4 border-t'>
								<div>
									<p className='mb-1'>File Type</p>
									<p className='font-semibold'>{file.type || 'Unknown'}</p>
								</div>
								<div>
									<p className='mb-1'>File Size</p>
									<p className='font-semibold'>
										{file.size / 1024 > 1024
											? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
											: `${(file.size / 1024).toFixed(2)} KB`}
									</p>
								</div>
							</div>
							<div className='flex gap-4 pt-4'>
								<Button
									variant={'outline'}
									onClick={handleReset}
									className='flex-1'
								>
									Cancel
								</Button>
								<Button onClick={handleUpload} className='flex-1'>
									Upload Cheque
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{isUploading && (
				<div className='fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50'>
					<div className='flex flex-col items-center space-y-4'>
						<LifeLine
							size='large'
							color={['#32cd32', '#327fcd', '#cd32cd', '#cd8032']}
						/>
						<p className='text-3xl font-semibold text-white'>
							Uploading cheque...
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
