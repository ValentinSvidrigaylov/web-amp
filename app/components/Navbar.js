import Link from "next/link"
import '../css/navbar.css'
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav style={{display: 'fixed', position: 'absolute', top: '0', left: '0'}}>
            <div className="navbar">
                <Link href='/' className={pathname == '/' ? 'active' : ''}>Web amp</Link>
                <Link href="/synth" className={pathname == '/synth' ? 'active' : ''}>Synth</Link>
                <Link href="/settings" className={pathname == '/settings' ? 'active' : ''}>Settings</Link>
                <Link href="/history" className={pathname == '/history' ? 'active' : ''}>History</Link>
            </div>
            <hr/>
        </nav>
    )
}
