// 'use client';
import ThemeButton from './components/ThemeButton.js'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar.js'
import Head from 'next/head'

// export const metadata = {
//   title: 'Web amp',
//   description: 'Simple guitar web amp based on tonejs',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Navbar></Navbar>{children}</body>
    </html>
  )
}
