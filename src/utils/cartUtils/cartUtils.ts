import { ICartItem } from '../../interfaces/cart';
import { AppDispatch } from '../../store/store';
import { addItemToCart, clearCart, removeItemFromCart } from './cartSlice';

export const addToCart = (dispatch: AppDispatch, item: ICartItem) => {
  dispatch(addItemToCart(item));
};

export const removeFromCart = (dispatch: AppDispatch, itemId: number) => {
  dispatch(removeItemFromCart(itemId));
};

export const clearCartItems = (dispatch: AppDispatch) => {
  dispatch(clearCart());
};
