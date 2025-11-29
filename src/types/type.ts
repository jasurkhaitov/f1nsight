export interface ApiError {
	error: {
		code: string
		message: string
		details: null
	}
}

export interface LoginPayload {
	email: string
	password: string
}

export interface LoginResponse {
	data: {
		token: string
		refreshToken: string
	}
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

export type UploadCheckResponse = {
	success: boolean
	data: {
		merchantName: string
		chequeDate: string
		subtotal: number
		serviceFee: number | null
		tax: number
		totalAmount: number
		items: {
			productName: string
			category: string
			price: number
		}[]
	}
	timestamp: number
}


export interface UploadCheckPayload {
	file: File
}

export interface InsightData {
	summary: string
	topCategory: string
	trend: string
}

export interface InsightResponse {
	success: boolean
	data: InsightData
	timestamp: number
}
