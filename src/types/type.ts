export interface LoginPayload {
	email: string
	password: string
}

export interface LoginResponse {
	token: string
	user: {
		id: string
		email: string
	}
}

export interface RegisterPayload {
	firstName: string
	lastName: string
	email: string
	password: string
}

export interface RegisterResponse {
	token: string
	user: {
		id: string
		email: string
	}
}