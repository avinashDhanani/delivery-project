export const metadata = {
  title: 'Next.js Template',
  description: 'A clean Next.js project template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
