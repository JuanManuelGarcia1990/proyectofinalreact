import "./Cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import ItemCart from "./ItemCart";
import Swal from 'sweetalert2';

const Cart = () => {
  const { cart, clear, removeItem, total } = useContext(CartContext);
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  const createOrder = (event) => {
    event.preventDefault();
    const db = getFirestore();

    const querySnapshot = collection(db, "orders");

    addDoc(querySnapshot, {
      buyer: {
        email: formValue.email,
        name: formValue.name,
        phone: formValue.phone,
      },
      products: cart.map((product) => {
        return {
          name: product.name,
          price: product.price,
          id: product.id,
          quantity: product.quantity,
        };
      }),
      total: total,
    })
      .then((response) => {
        console.log(response.id);
        Swal.fire({
          icon: 'success',
          title: `Orden con el id ${response.id} ha sido creada`,
        }).then(() => updateStocks(db))
        .catch((error) => console.log(error));
        
        updateStocks(db);
      })
      .catch((error) => console.log(error));
  };

  const updateStocks = (db) => {
    cart.forEach((product) => {
      const querySnapshot = doc(db, "products", product.id);

      updateDoc(querySnapshot, {
        stock: product.stock - product.quantity,
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            background: "black",
            width: "70%",
            icon: "success",
            iconColor: "red",
            title: "¡Compra finalizada con éxito! 'El stock de los productos ha sido actualizado'",
            text: "Muchas gracias por su compra",
            color: "white",
          });
          
        })
        .catch((error) => console.log(error));
    });
  };
  const handleInput = (event) => {
    setFormValue({
      ...formValue,
       [event.target.name]: event.target.value, });
  };
  return (
    <div className="mainCarrito">
      <h1>Carrito</h1>
      {cart.map((product) => (
        <div className="carrito" key={product.name}>
          <ItemCart product={product} />
          <button onClick={() => removeItem(product.id)}>
            Quitar Producto
          </button>
        </div>
      ))}
      <div className="carritoVacio">
        {cart.length === 0 && <h2>No hay productos en el carrito</h2>}
      </div>
      <div className="vaciar">
        <button onClick={() => navigate("/")}>Seguir Comprando</button>
        {cart.length > 0 && <button onClick={clear}>Vaciar Carrito</button>}
      </div>
      {cart.length > 0 && (
        <span>
          <h1>Total: {total} usd </h1>
        </span>
      )}
      <div className="form">
        <form className="cartForm">
          <input
            name="name"
            type="text"
            placeholder="nombre"
            value={formValue.name}
            onChange={handleInput}
          />
          <input
            name="phone"
            type="text"
            placeholder="telefono"
            value={formValue.phone}
            onChange={handleInput}
          />
          <input
            name="email"
            type="text"
            placeholder="email"
            value={formValue.email}
            onChange={handleInput}
          />
          <button onClick={createOrder}>Finalizar Compra</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
