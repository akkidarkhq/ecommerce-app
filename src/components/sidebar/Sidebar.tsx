import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import { getCategories } from '../../utils/productUtils/productUtils';

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentActivePath, setCurrentActivePath] = useState('');
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const data = await getCategories();
        setCategories([
          'electronics',
          'jewelery',
          "men's clothing",
          "women's clothing",
          'shoes',
          'clothes',
          'books',
          'furniture',
          'beauty',
          'sports',
          'food',
        ]);
      } catch (error) {
        setError(`Failed to load products: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Update the active path when the URL changes
  useEffect(() => {
    setCurrentActivePath(category || '');
  }, [category]); // Corrected dependency

  return (
    <div className="col-12 col-md-3 col-lg-2 col-xl-2 ">
      <div className="overflow-auto overflow d-flex justify-content-center container-fluid container">
        <ul className="list-group d-flex flex-md-column flex-row list-group-flush shadow mt-1 mt-sm-3 my-2 mt-lg-2 border-0 w-100">
          {categories.map((c, index) => (
            <li
              key={index}
              className={`list-group-item align-items-center justify-content-center border-md-end border-md-0 ${
                currentActivePath === c ? 'active' : ''
              }`}>
              <a
                href={`/products/category/${c}`}
                className="link-body-emphasis link-offset-2 h-100 link-offset-3-hover link-underline link-underline-opacity-0 stretched-link link-underline-opacity-75-hover">
                {c}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Sidebar;
