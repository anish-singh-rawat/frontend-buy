// Guest cart management
export const getGuestCartFromStorage = () => {
    const guestCart = localStorage.getItem('guestCart');
    return guestCart ? JSON.parse(guestCart) : [];
};

export const saveGuestCartToStorage = (cart) => {
    localStorage.setItem('guestCart', JSON.stringify(cart));
};

export const addToGuestCart = (item) => {
    const currentCart = getGuestCartFromStorage();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.productId === item.productId);
    
    if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
        currentCart[existingItemIndex].subTotal = currentCart[existingItemIndex].price * currentCart[existingItemIndex].quantity;
    } else {
        currentCart.push(item);
    }
    
    saveGuestCartToStorage(currentCart);
    return currentCart;
};