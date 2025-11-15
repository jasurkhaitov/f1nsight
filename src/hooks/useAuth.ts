import { loginRequest, registerRequest } from '@/api/auth'
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from '@/types/type'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
	return useMutation<LoginResponse, Error, LoginPayload>({
		mutationFn: loginRequest,
	})
}

export const useRegister = () => {
	return useMutation<RegisterResponse, Error, RegisterPayload>({
		mutationFn: registerRequest,
	})
}