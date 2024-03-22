import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import Concours from './pages/Concours'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreateConcours from './pages/CreateConcours'
import UpdateConcours from './pages/UpdateConcours'
import ConcoursPage from './pages/ConcoursPage'
import ScrollToTop from './components/ScrollToTop'



export default function App(){
  return(
    <BrowserRouter>
    <ScrollToTop />
     <Header/>
      <Routes >
       
        <Route path="/" element={<Home />} />
        <Route  path="/about" element={<About />} />
        <Route  path="/sign-in" element={<SignIn />} />
        <Route  path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />} >
            <Route  path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route element={<OnlyAdminPrivateRoute />} >
            <Route  path="/create-concours" element={<CreateConcours />} />
            <Route  path="/update-concours/:concoursId" element={<UpdateConcours />} />
        </Route>
        
        <Route  path="/concours" element={<Concours />} />
        <Route  path="/post/:concoursSlug" element={<ConcoursPage />} />
        
        </Routes> 
        <Footer />
    
    
    </BrowserRouter>
  )
}