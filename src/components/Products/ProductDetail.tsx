import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/ProductDetail.scss";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p className="price">Price: ${product.price}</p>
      <p className="category">Category: {product.category}</p>
      <p className="description">{product.description}</p>
      <Link to="/products">
        <button className="back-button">Regresar a Productos</button>
      </Link>
    </div>
  );
};

export default ProductDetail;
