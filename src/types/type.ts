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

export interface ReportResponse {
	success: boolean
	data: ReportData
	timestamp: number
}

export interface ReportData {
	startDate: string
	endDate: string
	totalSpent: number
	transactionCount: number
	categoryTotals: Record<string, number>
	comparisonPercentage: number | null
}

export interface YearlyReportResponse {
	success: boolean
	data: {
		monthlyTotals: {
			JANUARY: number
			FEBRUARY: number
			MARCH: number
			APRIL: number
			MAY: number
			JUNE: number
			JULY: number
			AUGUST: number
			SEPTEMBER: number
			OCTOBER: number
			NOVEMBER: number
			DECEMBER: number
		}
	}
	timestamp: number
}