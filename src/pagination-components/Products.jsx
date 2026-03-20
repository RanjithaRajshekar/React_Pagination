import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageProd = 10;

  const totalPages = Math.ceil(totalProducts / perPageProd);
  const pageNum = [...Array(totalPages).keys()].map((n) => n + 1);

  const start = (currentPage - 1) * perPageProd;
  const end = start + perPageProd;
  const pagination = products.slice(start, end);

  const handlePageClick = (npage) => {
    setCurrentPage(npage);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=200");
      const json = await data.json();
      setProducts(json?.products);
      setTotalProducts(json?.total);
    } catch (error) {
      console.error("Fetching data errors", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return products.length === 0 ? (
    <h1>Products are Loading</h1>
  ) : (
    <>
      <button
        onClick={handleNext}
        disabled={currentPage - 1}
        className="p-2 border border-solid cursor-pointer disabled:opacity-50 font-gray"
      >
        Next
      </button>

      {pageNum.map((n) => (
        <button
          key={n}
          className="p-2 border border-solid cursor-pointer"
          onClick={() => handlePageClick(n)}
          style={{ color: currentPage === n ? "red" : "black" }}
        >
          {n}
        </button>
      ))}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 border border-solid cursor-pointerder disabled:opacity-50 font-gray"
      >
        Prev
      </button>
      <ProductCard products={pagination} />
    </>
  );
};

export default Products;
