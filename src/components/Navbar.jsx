import { Link, useLocation } from 'react-router-dom'
import PillNav from './reactbits/PillNav'
import logoMark from '../assets/Home/logo-mark.png'

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
  </svg>
)

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Team', href: '/team' },
  { label: 'Sponsor Us', href: '/sponsor', icon: <StarIcon /> },
]

// PillNav passes `href`; React Router's Link expects `to`
const RouterLink = ({ href, ...props }) => <Link to={href} {...props} />

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 font-mono">
      <PillNav
        logo={logoMark}
        logoAlt="Team VAYU home"
        logoHref="/"
        items={NAV_ITEMS}
        activeHref={pathname}
        linkComponent={RouterLink}
        theme="dark"
        itemStyle="plain"
        bounce={0.37}
      />
    </header>
  )
}

export default Navbar
