import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider'
import {  RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
// Create a client
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster position='top-right' reverseOrder={false} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
)
