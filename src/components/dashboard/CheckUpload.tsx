import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

type FileUploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export default function CheckUpload() {
	const [file, setFile] = useState<File | null>(null)
	const [status, setStatus] = useState<FileUploadStatus>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const validateFile = (f: File) => {
		const maxSize = 3 * 1024 * 1024 // 5MB
		const allowedTypes = [
			'application/pdf',
			'image/jpeg',
			'image/png',
			'text/plain',
		]

		if (!allowedTypes.includes(f.type)) {
			setErrorMessage('Please upload a PDF, image, or text file')
			return false
		}
		if (f.size > maxSize) {
			setErrorMessage('File size must be less than 5MB')
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
			} else {
				setStatus('error')
			}
		}
	}

	const handleUpload = async () => {
		if (!file) return

		setStatus('uploading')
		await new Promise(resolve => setTimeout(resolve, 1500))
		setStatus('success')
	}

	const handleReset = () => {
		setFile(null)
		setStatus('idle')
		setErrorMessage('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className='w-full max-w-5xl mt-2'>
			<input
				ref={fileInputRef}
				type='file'
				onChange={handleInputChange}
				className='hidden'
				accept='.pdf,.jpg,.jpeg,.png,.txt'
				aria-label='File upload input'
			/>

			{status === 'idle' || (status === 'error' && !file) ? (
				<div className='grid md:grid-cols-2 gap-6'>
					<div
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
						className={`rounded-md p-5 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-dashed`}
					>
						<div className='space-y-3'>
							<h3 className='text-2xl font-bold mb-3'>Drag & Drop</h3>
							<p>Drop your file here to upload</p>

							<p className='text-sm text-slate-500'>Supported: PNG, JPG</p>
							<p className='text-xs text-slate-400 mt-1'>Max size: 3 MB</p>
						</div>
					</div>

					<div className='rounded-md p-5 flex flex-col items-center justify-center text-center border-2'>
						<div className='space-y-3'>
							<h3 className='text-2xl font-bold mb-3'>Browse Files</h3>
							<p className='mb-3'>Choose a file from your device</p>
							<Button
								onClick={() => fileInputRef.current?.click()}
								variant={'outline'}
							>
								Choose File
							</Button>
							<div className='pt-3'>
								<p className='text-sm text-slate-500'>Supported: PNG, JPG</p>
								<p className='text-xs text-slate-400 mt-3'>Max size: 5MB</p>
							</div>
						</div>
					</div>
				</div>
			) : (
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
						<Button onClick={handleReset}>Try Again</Button>
					</div>
				</div>
			)}

			{file && status === 'idle' && (
				<div className='mt-4 rounded-md p-8 border'>
					<div className='space-y-4'>
						<div className='flex items-start justify-between'>
							<div>
								<h3 className='text-sm mb-1'>Selected File</h3>
								<p className='text-xl font-bold wrap-break-word'>{file.name}</p>
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
							<Button variant={'outline'} onClick={handleReset}>
								Cancel
							</Button>
							<Button onClick={handleUpload}>Upload File</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
