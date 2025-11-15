import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<App />
					<Toaster />
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
