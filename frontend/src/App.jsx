import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import AddProduct from './components/AddProduct.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Welcome to CodeTribe Marketplace</h1>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
