import { Route, Routes, Navigate } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicRoute } from './routes/PublicRoute'

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<BrowsePage />} />

				<Route element={<PublicRoute />}>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route path='/dashboard' element={<DashboardPage />} />
				</Route>

				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</AuthProvider>
	)
}
