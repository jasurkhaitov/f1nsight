import { useMutation } from '@tanstack/react-query'
import { uploadChequeRequest } from '@/api/cheque'
import type { ApiError, UploadCheckResponse } from '@/types/type'

export const useUploadCheque = () => {
	return useMutation<UploadCheckResponse, ApiError, File>({
		mutationFn: uploadChequeRequest,
		retry: false,
	})
}
