import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
	isAuthenticated: boolean
	login: (token: string, refreshToken: string) => void
	logout: () => void
	getToken: () => string | null
	getRefreshToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		const token = localStorage.getItem('token')
		const refreshToken = localStorage.getItem('refreshToken')
		return !!token && !!refreshToken
	})

	const login = (token: string, refreshToken: string) => {
		localStorage.setItem('token', token)
		localStorage.setItem('refreshToken', refreshToken)
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('refreshToken')
		setIsAuthenticated(false)
	}

	const getToken = () => {
		return localStorage.getItem('token')
	}

	const getRefreshToken = () => {
		return localStorage.getItem('refreshToken')
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				getToken,
				getRefreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
