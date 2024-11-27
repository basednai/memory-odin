export default function Card({ imgUrl, alt, handleClick }) {
  return (
      <div className="card" id={alt.replace(" ", "")} onClick={handleClick}>
      <img src={imgUrl} alt={alt} />
      <h3>{alt}</h3>
    </div>
  );
}
