import "./ItemCount.css";

const ItemCount = ({count, setCount}) => {
  const onAdd = () => {
    setCount(count + 1);
  };
  const restar = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
  };
  return (
    <div className="counter">
      <div className="controllers">
        <button disabled={count === 0} onClick={restar}>-</button>
        <div>
          <span>{count}</span>
        </div>
        <button disabled={count === 0} onClick={onAdd}>+</button>
      </div>
    </div>
  );
};

export default ItemCount;
