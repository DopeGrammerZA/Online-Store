import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import AddProduct from './components/AddProduct.jsx'; 
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import NavBar from './components/NavBar.jsx';



function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/productDetails/id" element={<ProductDetails />} />
                  
                </Routes>
            </div>
        </Router>
    );
}

export default App;
