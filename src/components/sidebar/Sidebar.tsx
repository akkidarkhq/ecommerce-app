import React, { useEffect, useState } from 'react';

import { getCategories } from '../../utils/productUtils/productUtils';

const Sidebar = () => {
  const [categories, setCatgories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCatgories(data);
        console.info(data);
      } catch (error) {
        setError(`Failed to load products ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-2 pt-2 ">
      <ul className="list-group list-group-flush">
        {categories.map((c, index) => (
          <li className="list-group-item" key={index}>
            <a href={`/products/category/${c}`}>{c}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
