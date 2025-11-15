import type {
	LoginPayload,
	LoginResponse,
	RegisterPayload,
	RegisterResponse,
} from '@/types/type'
import { API_URL } from './url'

export const loginRequest = async (
	payload: LoginPayload
): Promise<LoginResponse> => {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Login failed')
	}

	return data as LoginResponse
}

export const registerRequest = async (
	payload: RegisterPayload
): Promise<RegisterResponse> => {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Registration failed')
	}

	return data as RegisterResponse
}
