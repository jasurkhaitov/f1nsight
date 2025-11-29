import { loginRequest, registerRequest } from '@/api/auth'
import type {
	ApiError,
	LoginPayload,
	LoginResponse,
	RegisterPayload,
	RegisterResponse,
} from '@/types/type'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
	return useMutation<LoginResponse, ApiError, LoginPayload>({
		mutationFn: loginRequest,
		retry: false,
		gcTime: 0,
	})
}

export const useRegister = () => {
	return useMutation<RegisterResponse, ApiError, RegisterPayload>({
		mutationFn: registerRequest,
		retry: false,
		gcTime: 0,
	})
}
