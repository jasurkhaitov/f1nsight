import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicRoute } from './routes/PublicRoute'
import { LifeLine } from 'react-loading-indicators'

const BrowsePage = lazy(() => import('./pages/BrowsePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

export default function App() {
	return (
		<AuthProvider>
			<Suspense
				fallback={
					<div className='w-full h-screen flex items-center justify-center'>
						<LifeLine size='medium' color={'blue'}/>
					</div>
				}
			>
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
			</Suspense>
		</AuthProvider>
	)
}
