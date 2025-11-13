import { Route, Routes } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import LoginPage from './pages/LoginPage'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<BrowsePage />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	)
}
