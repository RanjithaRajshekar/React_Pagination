const ProductCard = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((p) => (
        <div
          className="product-card w-[240px] h-[220px] border-2 border-cyan-300 p-3 m-2 flex flex-wrap"
          key={p.id}
        >
          <img className="w-[150px] h-[130px]" src={p?.images} alt={p?.title} />
          <h4 className="text-center">{p?.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
