import BrowseNavbar from '@/components/browse/BrowseNavbar'
import BrowseHeader from '@/components/browse/BrowseHeader'

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-background'>
			<BrowseNavbar />

			<BrowseHeader />
		</div>
	)
}
