import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Component/Header'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Private from './Component/Private';
import ShowItem from './Pages/SearchItem';
import ShowProduct from './Pages/ShowProduct'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/search' element={<ShowItem />} />
        <Route element={<Private />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/item/:itemid' element={<ShowProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
