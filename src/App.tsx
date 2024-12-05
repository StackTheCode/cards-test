import React  from 'react'
import { Routes ,Route} from 'react-router-dom'

import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CreateProductPage from './pages/CreateProductPage'
import HomePage from './pages/HomePage'
const App:React.FC =() =>{
return(
  <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="*" element={<HomePage/>} />
    </Routes>
)

}

export default App
