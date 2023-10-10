import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import ToasterProvider from '@providers/ToasterProvider'
import Navbar from '@components/Navbar'
import RegisterModal from '@components/Modals/RegisterModal'
import LoginModal from '@components/Modals/LoginModal'
import getCurrentUser from '@actions/getCurrentUser'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Travel Roost',
  description: `Travel Roost - Your Nest Away from Home! Find the perfect place to stay at an amazing price in over 191 countries.`,
  icons: {icon: "/images/logo.svg"}
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
