import Link from "next/link"
import '../css/navbar.css'
import { usePathname } from "next/navigation"
import ThemeButton from "../components/ThemeButton"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav>
            <ThemeButton></ThemeButton>
            <div className="navbar">
                <Link href='/' className={pathname == '/' ? 'active' : '' + "nav-link"}>Web amp</Link>
                <Link href="/synth" className={pathname == '/synth' ? 'active' : '' + "nav-link"}>Synth</Link>
                <Link href="/settings" className={pathname == '/settings' ? 'active' : '' + "nav-link"}>Settings</Link>
                <Link href="/history" className={pathname == '/history' ? 'active' : '' + "nav-link"}>History</Link>
            </div>
            <hr/>
        </nav>
    )
}
