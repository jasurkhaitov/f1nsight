import { type UploadCheckResponse } from './../types/type';

import { API_URL } from './url'

export const uploadChequeRequest = async (
	file: File
): Promise<UploadCheckResponse> => {
	const formData = new FormData()
	formData.append('image', file)

	const token = localStorage.getItem('token')

	const res = await fetch(`${API_URL}/cheques/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	})

	const data = await res.json()

	if (!res.ok || !data.success) {
		throw {
			error: data.error || {
				code: 'UPLOAD_FAILED',
				message: 'Failed to upload cheque',
				details: null,
			},
		}
	}

	return data
}