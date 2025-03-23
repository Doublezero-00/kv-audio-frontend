import "./ProductCard.css";
export default function ProductCard(props) {
  return (
    <div>
      <img src={props.img} />
      <span className="name">{props.name}</span>
      <br />
      <span className="price">{props.price}</span>
      <p>{props.description}</p>
    </div>
  );
}
