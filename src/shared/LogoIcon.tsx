import { Link } from 'react-router-dom'
import Icon from '../assets/icon.svg'

export default function LogoIcon() {
	return (
		<Link to={'/'} className='flex items-center space-x-3'>
			<img src={Icon} className='w-10 h-10' alt='Logo Icon' />
			<span className='hidden xs:block text-xl font-bold font-montserrat text-foreground'>
				F1nsight
			</span>
		</Link>
	)
}
