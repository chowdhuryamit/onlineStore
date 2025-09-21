import {Outlet} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  
  return (
    <div>
      <Toaster position='top-center'/>
      <Header />
      <ScrollToTop/>
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )   
}

export default App
