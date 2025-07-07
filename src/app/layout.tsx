import './globals.css'

export const metadata = {
  title: 'Port Stef',
  description: 'Portfolio website built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
} 