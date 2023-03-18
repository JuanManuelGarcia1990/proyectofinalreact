import "./CartWidget.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const [total, setTotal] =useState(0)
  console.log(cart);
  useEffect (() => {
    setTotal(cart.reduce((prev, curr) => prev + curr.quantity, 0))
  }, [cart])
  return (
    <Link className="cart" to={'/cart'}>
      <div >🛒{total}</div>
    </Link>
  );
};

export default CartWidget;
