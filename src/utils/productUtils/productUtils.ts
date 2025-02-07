import axios from 'axios';

import { IProduct } from '../../interfaces/product';

const getCategories = async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching getCategories:', error);
    throw error;
  }
};

const getProductByCategory = async (category: string) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching getCategories:', error);
    throw error;
  }
};

const getProducts = async (query?: string) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/');
    const data: IProduct[] = response.data;
    if (query) {
      return data.filter((p) => p.title?.toLowerCase().startsWith(query.toLowerCase()));
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching getCategories:', error);
    throw error;
  }
};

export { getCategories, getProducts, getProductByCategory };
