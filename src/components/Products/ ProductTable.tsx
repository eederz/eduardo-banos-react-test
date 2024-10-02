import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/ProductsTable.scss";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState({ field: "", ascending: true });
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        fetch(`https://fakestoreapi.com/products`)
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            localStorage.setItem("products", JSON.stringify(data));
          });
      }
    }
  }, [isAuthenticated, navigate]);  

  const handleSort = (field: keyof Product) => {
    const isAscending = sortOrder.field === field ? !sortOrder.ascending : true;
    const sortedProducts = [...products].sort((a, b) => {
      return isAscending
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
    });
    setProducts(sortedProducts);
    setSortOrder({ field, ascending: isAscending });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 3 && currentPage - 3 > 1) {
        pageNumbers.push("...");
      } else if (i === currentPage + 3 && currentPage + 3 < totalPages) {
        pageNumbers.push("...");
      }
    }

    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => typeof number === "number" && paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Title {sortOrder.field === "title" && (sortOrder.ascending ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("price")}>
              Price {sortOrder.field === "price" && (sortOrder.ascending ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("category")}>
              Category {sortOrder.field === "category" && (sortOrder.ascending ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} onClick={() => handleRowClick(product.id)}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default ProductTable;
