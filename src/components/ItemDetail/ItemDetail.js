import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';

const ItemDetail = ({ detail }) => {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const [count, setCount] = useState(detail?.stock === 0 ? 0 : 1);

  const addToCart = () => {
    if (count <= detail.stock) {
      addItem(detail, count);
      Swal.fire({
        position: "center",
        background: "black",
        width: "70%",
        title: "Producto agregado al carrito",
        icon: "success",
        iconColor: "red",
        showConfirmButton: false,
        timer: 2000,
        color: "red",
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `No hay suficientes productos en stock. Solo hay ${detail.stock} unidades disponibles`,
      });
    }
  };

  return (
    <div className="detail">
      <img src={`/tienda/${detail.image}`} alt={detail.name} />
      <h2>{detail.name}</h2>
      <h3>{detail.description}</h3>
      <h3>{detail.price} usd</h3>
      <ItemCount count={count} setCount={setCount} />
      <button onClick={() => navigate("/")}>Seguir Comprando</button>
      <button disabled={count > detail.stock} onClick={addToCart}>
        Agregar al 🛒
      </button>
      <button onClick={() => navigate("/cart")}>Finalizar compra</button>
    </div>
  );
};

export default ItemDetail;


