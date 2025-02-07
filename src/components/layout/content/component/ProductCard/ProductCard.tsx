import React, { useState } from 'react';

import { IProduct } from '../../../../../interfaces/product';
import ProductDetails from '../ProductDetails/ProductDetails';
import Cart, { ICartItem } from '../../../../cart/Cart';

interface ProductCardProps {
  product: IProduct; // Type for the prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const handleAddToCart = () => {
    if (product.id === undefined || product.title === undefined || product.price === undefined) {
      console.error('Product is missing required fields.');
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        return [
          ...prev,
          {
            id: product.id!,
            title: product.title!,
            price: product.price!,
            quantity: 1,
          },
        ];
      }
    });

    setShowCartModal(true);
  };

  return (
    <div
      className="card h-100"
      style={{
        width: '400px;',
        height: '400px;',
      }}>
      <img
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
      {showCartModal && (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onOrder={() => console.warn('Order placed!')}
        />
      )}
    </div>
  );
};

export default ProductCard;
