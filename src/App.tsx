import { Route, Routes } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<BrowsePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/dashboard' element={<DashboardPage/>} />
		</Routes>
	)
}
