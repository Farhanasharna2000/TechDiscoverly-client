import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'

const MainLayout = () => {
  return (
    <div className='bg-[#FFF8E6]/30 font-lato'>
      <Navbar/>
      <div className=' min-h-screen'>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration/>
    </div>
  )
}

export default MainLayout
