import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

import getCurrentUser from '@actions/getCurrentUser'
import ToasterProvider from '@providers/ToasterProvider'

import Navbar from '@components/Navbar'
import Modals from '@components/Modals'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Travel Roost',
  description: `Travel Roost - Your Nest Away from Home! Find the perfect place to stay at an amazing price in over 191 countries.`,
  icons: {icon: "/images/logo-icon.svg"}
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
        <Modals />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
