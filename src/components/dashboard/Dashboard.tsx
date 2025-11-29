import { useUploadCheque } from '@/hooks/useCheque'
import { addUploadedCheque, openSheet } from '@/store/chequeSlice'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hook'
import CheckUpload from './CheckUpload'
import ReportTabs from './ReportTabs'

export default function Dashboard() {
	const dispatch = useAppDispatch()
	const uploadMutation = useUploadCheque()
	const { logout } = useAuth()
	const navigate = useNavigate()

	const handleUpload = (file: File) => {
		uploadMutation.mutate(file, {
			onSuccess: response => {
				toast.success('Cheque uploaded successfully!')
				dispatch(addUploadedCheque(response.data))
				dispatch(openSheet())
			},
			onError: err => {
				const errorMessage =
					typeof err.error === 'string' ? err.error : err.error?.message
				if (errorMessage === 'Invalid or expired token') {
					logout()
					navigate('/login')
					return
				}
				toast.error('Upload failed', {
					description: errorMessage || 'Failed to upload cheque.',
				})
			},
		})
	}

	return (
		<div className='px-4 pt-20'>
			<CheckUpload
				onUpload={handleUpload}
				isUploading={uploadMutation.isPending}
			/>

			<ReportTabs/>
		</div>
	)
}
