import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IProduct } from '../../../../../interfaces/product';
import ProductDetails from '../ProductDetails/ProductDetails';
import { addToCart } from '../../../../../utils/cartUtils/cartUtils';

interface ProductCardProps {
  product: IProduct; // Type for the prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.id !== undefined) {
      addToCart(dispatch, {
        ...product,
        quantity: 1,
      });
    } else {
      console.error('Product ID is undefined. Cannot add to cart.');
    }
  };

  return (
    <div
      className="card h-100 w-100 shadow"
      style={{
        width: '350px',
        height: '400px',
      }}>
      <img
        onClick={() => setShowDetailsModal(true)}
        src={product.image}
        className="card-img-top img-thumbnail object-fit-contain"
        style={{
          height: '200px',
        }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-truncate" style={{ maxWidth: '200px' }}>
          {product.description}
        </p>
        <p className="card-text">{product.price}</p>
      </div>
      <div className="card-footer text-body-secondary d-flex justify-content-evenly">
        <button className="btn btn-primary" onClick={() => setShowDetailsModal(true)}>
          View
        </button>
        <button className="btn btn-primary" onClick={() => handleAddToCart()}>
          add
        </button>
      </div>
      {showDetailsModal && <ProductDetails product={product} onClose={() => setShowDetailsModal(false)} />}
    </div>
  );
};

export default ProductCard;
