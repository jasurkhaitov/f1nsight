import { Route, Routes } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<BrowsePage />} />

			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />

			<Route path='/dashboard' element={<DashboardPage/>} />
		</Routes>
	)
}