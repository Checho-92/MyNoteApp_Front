import {  Outlet } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
// import Header from '../components/header';
// import Footer from '../components/footer';





export const AppRouter = () => {
  return (
    <div>
      <Header/>
            <div className="w-full mx-auto px- pt-0">
            <Outlet/>
            </div> 
    <Footer/>

    </div>
  )
}
