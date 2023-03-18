import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const ItemDetail = ({detail}) => {
  const navigate = useNavigate();
  const {addItem} = useContext(CartContext)
  const [count, setCount] = useState(detail?.stock === 0 ? 0 : 1);
  return (
    <div className='detail'>
      <img src={`/tienda/${detail.image}`} alt={detail.name} />
      <h2>{detail.name}</h2>
      <h3>{detail.description}</h3>
      <h3>{detail.price} usd</h3>
      <ItemCount count={count} setCount={setCount} />
      <button onClick={() => navigate('/')}>Seguir Comprando</button>
      <button disabled={count > detail.stock}  onClick={() => addItem(detail, count)}>Agregar al 🛒</button>
      <button onClick={() => navigate('/cart')}>Finalizar compra</button>
    </div>
  );
}

export default ItemDetail


