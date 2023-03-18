import logo from "./components/Assets/logo/logo.png";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./pages/ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./pages/ItemDetailContainer/ItemDetailContainer";
import Cart from "./pages/Cart/Cart";
import { NavLink } from "react-router-dom";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <div className="App">
        <header className="header">
          <NavLink to="/">
            <img src={logo} className="logo" alt="logo" />
          </NavLink>
          <NavBar />
        </header>
      </div>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Esta página no existe</h1>
            </div>
          }
        />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
