import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getProductByCategory, getProducts } from '../../../utils/productUtils/productUtils';
import { IProduct } from '../../../interfaces/product';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../sidebar/Sidebar';
import ProductCard from './component/ProductCard/ProductCard';
import HomePage from '../../../pages/home/HomePage';

const Content: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { category } = useParams<{ category: string }>(); // Get category from URL params
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentActivePath = useLocation();
  const queryParams = new URLSearchParams(currentActivePath.search);
  const searchQuery = queryParams.get('query') ?? '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = category ? await getProductByCategory(category) : await getProducts(searchQuery);
        setProducts(data);
        console.info(data);
      } catch (error) {
        setError(`Failed to load products ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, category]);
  if (!isLoggedIn) {
    return <HomePage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex flex-column flex-md-row" style={{ height: 'calc(100vh - 112px)' }}>
      <Sidebar />
      <div className="flex-grow-1 p-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 112px)' }}>
        <h2>Products List</h2>
        <ul className="list-unstyled d-flex flex-wrap m-0 p-0">
          {products.map((product, index) => (
            <li className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={index}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Content;
