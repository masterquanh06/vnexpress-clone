'use client'
import { useEffect } from 'react'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { refreshToken } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await refreshToken()
        setAccessToken(res.data.accessToken)
        localStorage.setItem("accessToken", res.data.accessToken)
      } catch (error) {
        console.error("Refresh token failed", error)
      }
    }

    fetchToken()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Container style={{ minHeight: "calc(100vh - 106px)" }}>
          {children}
        </Container>
        <AppFooter />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  )
}
