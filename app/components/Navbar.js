"use client"
import { useTranslations } from "next-intl";
// import Link from "next/link"
import '../css/navbar.css'
// import { usePathname } from "next/navigation"
import ThemeButton from "../components/ThemeButton"
import LocaleSwitcher from "../components/LocaleSwitcher"

import { locales } from "../[locale]/layout";

import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const localePrefix = 'always'; // Default
 
// export const {Link, redirect, usePathname, useRouter} =
//   createSharedPathnamesNavigation({LOCALES, localePrefix});

export const {Link, redirect, usePathname, useRouter} =
createSharedPathnamesNavigation({locales, localePrefix}); 

export default function Navbar() {
    // const pathname = usePathname()
    const t = useTranslations("Navbar");
    const pathname = usePathname();
    const router = useRouter();
    return (
        <nav>
            <ThemeButton></ThemeButton>
            <div style={{ color: "var(--contrast-color) !important", float: "right", padding: "0.25rlh" }}>
                <LocaleSwitcher/>
            </div>
            <div className="navbar">
                <Link href='/' className={pathname == '/' ? 'active' : '' + "nav-link"}>{ t("WebAmp") }</Link>
                <Link href="/synth" className={pathname == '/synth' ? 'active' : '' + "nav-link"}>{ t("Synth") }</Link>
                <Link href="/settings" className={pathname == '/settings' ? 'active' : '' + "nav-link"}>{ t("Settings") }</Link>
                <Link href="/history" className={pathname == '/history' ? 'active' : '' + "nav-link"}>{ t("History") }</Link>
            </div>
            <hr/>
        </nav>
    )
}
