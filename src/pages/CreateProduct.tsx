import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsCreate.scss";

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!product.title) newErrors.title = "El título es obligatorio.";
    if (!product.price || isNaN(Number(product.price)))
      newErrors.price = "El precio es obligatorio y debe ser un número.";
    if (!product.description)
      newErrors.description = "La descripción es obligatoria.";
    if (!product.category) newErrors.category = "La categoría es obligatoria.";
    if (!product.image) newErrors.image = "La imagen es obligatoria.";

    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulario válido, enviando datos...");
    }
  };

  const goBack = () => {
    navigate("/products");
  };

  return (
    <div className="create-product-page">
      <button className="go-back-button" onClick={goBack}>
        ← Regresar
      </button>

      <div className="create-product-container">
        <h1>Crear Producto</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={product.title}
            onChange={handleInputChange}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

          <input
            type="text"
            name="price"
            placeholder="Precio"
            value={product.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}

          <textarea
            name="description"
            placeholder="Descripción"
            value={product.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}

          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={product.category}
            onChange={handleInputChange}
          />
          {errors.category && (
            <p className="error-message">{errors.category}</p>
          )}

          <button type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
