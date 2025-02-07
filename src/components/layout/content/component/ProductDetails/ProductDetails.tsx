import React from 'react';

import { IProduct } from '../../../../../interfaces/product';

interface ProductDetailsProps {
  product: IProduct;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body pt-0">
            <div className="card ">
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid rounded-start object-fit-cover h-100"
                    style={{
                      maxHeight: '250px',
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body border-start border-secondary-subtle">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description || 'No description available.'}</p>
                    <p className="card-text">
                      <strong>Category:</strong> {product.category || 'N/A'}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ${product.price ? product.price.toFixed(2) : 'N/A'}
                    </p>
                    <p className="card-text">
                      <strong>Ratings:</strong>
                      <i className="bi bi-star-fill text-warning mx-1"></i>
                      <span className="fw-bold">{product.rating ? product.rating.rate.toFixed(2) : 'N/A'}</span>

                      <span className="mx-2">|</span>

                      <strong>Total Reviews:</strong>
                      <span className="text-muted">{product.rating ? product.rating.count : 'N/A'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
