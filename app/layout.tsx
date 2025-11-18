import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Header from '../components/Header'

export const metadata = {
  title: 'CFE Portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto p-6">
          <Header />
          <main className="mt-6 bg-white rounded-lg shadow-sm p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
