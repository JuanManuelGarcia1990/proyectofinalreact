import "./Item.css"

const Item = ({product}) => {
  return (
    <div className="item">
      <img alt={product.name} src={`/tienda/${product.image}`} />
      <h2>{product.name}</h2>
      <h2>{product.price} usd</h2>      
    </div>
  )
}

export default Item