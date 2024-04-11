// 'use client';
import ThemeButton from '../components/ThemeButton.js'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../components/Navbar.js'
import { notFound } from 'next/navigation'
import Providers from "./providers";

// export const metadata = {
//   title: 'Web amp',
//   description: 'Simple guitar web amp based on tonejs',
// }

export const locales = ["en", "ru"];

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

// Dynamically import needed messages for given locale
async function getMessages(locale) {
  try {
    return (await import(`i18n/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default async function RootLayout({ children, params: { locale }}) {
  const messages = await getMessages(locale);
  return (
    <html lang={locale}>
      <Providers messages={messages} locale={locale}>
        <body><Navbar></Navbar>{children}</body>
      </Providers>
    </html>
  )
}