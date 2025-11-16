import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Cloud, CheckCircle2, AlertCircle } from 'lucide-react'

type FileUploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export default function CheckUpload() {
	const [dragActive, setDragActive] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [status, setStatus] = useState<FileUploadStatus>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const validateFile = (f: File) => {
		const maxSize = 5 * 1024 * 1024 // 5MB
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
		setDragActive(false)

		const droppedFiles = e.dataTransfer.files
		if (droppedFiles && droppedFiles[0]) {
			const droppedFile = droppedFiles[0]
			if (validateFile(droppedFile)) {
				setFile(droppedFile)
				setErrorMessage('')
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
		<div className='bg-linear-to-br from-background to-background/90 p-4'>
			<div className='bg-card rounded-2xl shadow-lg border-2 border-border w-full'>
				<div
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					className={`p-12 text-center transition-all duration-200 ${
						dragActive
							? 'bg-accent/10 border-2 border-accent'
							: 'border-2 border-dashed border-border/50'
					}`}
				>
					<input
						ref={fileInputRef}
						type='file'
						onChange={handleInputChange}
						className='hidden'
						accept='.pdf,.jpg,.jpeg,.png,.txt'
						aria-label='File upload input'
					/>

					{status === 'idle' || (status === 'error' && !file) ? (
						<div className='space-y-6'>
							<div className='flex justify-center'>
								<div className='w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center'>
									<Cloud className='w-12 h-12 text-accent' strokeWidth={1.5} />
								</div>
							</div>
							<div>
								<p className='text-xl font-semibold text-foreground mb-2'>
									Drag & drop your file here
								</p>
								<p className='text-muted-foreground mb-4'>
									or click the button below to browse
								</p>
							</div>
							<div className='flex gap-4 justify-center'>
								<Button
									onClick={() => fileInputRef.current?.click()}
									className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 h-auto'
								>
									Choose File
								</Button>
								<Button variant='outline' className='px-8 py-2 h-auto'>
									Browse
								</Button>
							</div>
							<p className='text-sm text-muted-foreground'>
								Supported: PDF, JPG, PNG, TXT (Max 5MB)
							</p>
						</div>
					) : status === 'uploading' ? (
						<div className='space-y-6 py-4'>
							<div className='flex justify-center'>
								<div className='w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse'>
									<Cloud className='w-12 h-12 text-accent' strokeWidth={1.5} />
								</div>
							</div>
							<div>
								<p className='text-xl font-semibold text-foreground mb-2'>
									Uploading {file?.name}...
								</p>
								<div className='w-full bg-border rounded-full h-2 mt-4 overflow-hidden'>
									<div className='bg-accent h-full w-2/3 animate-pulse rounded-full'></div>
								</div>
							</div>
						</div>
					) : status === 'success' ? (
						<div className='space-y-6 py-4'>
							<div className='flex justify-center'>
								<div className='w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center'>
									<CheckCircle2
										className='w-12 h-12 text-accent'
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div>
								<p className='text-xl font-semibold text-foreground mb-1'>
									Upload Successful!
								</p>
								<p className='text-muted-foreground text-sm mb-2'>
									{file?.name}
								</p>
								<p className='text-muted-foreground text-xs'>
									{(file?.size ?? 0) / 1024 > 1024
										? `${((file?.size ?? 0) / (1024 * 1024)).toFixed(2)} MB`
										: `${((file?.size ?? 0) / 1024).toFixed(2)} KB`}
								</p>
							</div>
							<Button
								onClick={handleReset}
								className='bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-2 h-auto'
							>
								Upload Another File
							</Button>
						</div>
					) : (
						<div className='space-y-6 py-4'>
							<div className='flex justify-center'>
								<div className='w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center'>
									<AlertCircle
										className='w-12 h-12 text-destructive'
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div>
								<p className='text-xl font-semibold text-foreground mb-2'>
									Upload Failed
								</p>
								<p className='text-destructive text-sm mb-4'>{errorMessage}</p>
							</div>
							<Button
								onClick={handleReset}
								variant='outline'
								className='px-8 py-2 h-auto'
							>
								Try Again
							</Button>
						</div>
					)}
				</div>

				{file && status !== 'error' && (
					<div className='px-12 py-8 bg-muted/30 border-t border-border'>
						<div className='space-y-4'>
							<div className='flex items-start justify-between'>
								<div>
									<p className='text-sm text-muted-foreground mb-1'>
										Selected File
									</p>
									<p className='text-lg font-semibold text-foreground wrap-break-word'>
										{file.name}
									</p>
								</div>
								{status === 'success' && (
									<CheckCircle2 className='w-5 h-5 text-accent shrink-0' />
								)}
							</div>
							<div className='grid grid-cols-2 gap-4 text-sm'>
								<div>
									<p className='text-muted-foreground'>File Type</p>
									<p className='font-medium text-foreground'>
										{file.type || 'Unknown'}
									</p>
								</div>
								<div>
									<p className='text-muted-foreground'>File Size</p>
									<p className='font-medium text-foreground'>
										{file.size / 1024 > 1024
											? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
											: `${(file.size / 1024).toFixed(2)} KB`}
									</p>
								</div>
							</div>

							{status === 'idle' && file && (
								<div className='flex gap-3 pt-4 border-t border-border'>
									<Button
										onClick={handleUpload}
										className='flex-1 bg-accent hover:bg-accent/90 text-accent-foreground'
									>
										Upload File
									</Button>
									<Button
										onClick={handleReset}
										variant='outline'
										className='flex-1'
									>
										Cancel
									</Button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
