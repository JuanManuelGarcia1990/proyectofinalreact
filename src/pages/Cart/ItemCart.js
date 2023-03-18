import { useState, useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../../components/ItemCount/ItemCount'

const ItemCart = ({product}) => {
    const { updateItem } = useContext(CartContext)

    const [quantity, setQuantity] = useState(product.quantity)

    useEffect(() => {
        updateItem(product.id, quantity)
    }, [quantity])
  return (
    <>
          <h2>{product.name}</h2>
          <img src={`/tienda/${product.image}`} alt={product.name} />
          <ItemCount count={quantity} setCount={setQuantity} />
          <h2>Subtotal: {product.price * product.quantity} usd</h2>          
    </>
  )
}

export default ItemCart