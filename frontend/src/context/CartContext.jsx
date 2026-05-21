import { createContext, useContext, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const add = (item, stall) => setItems(prev => {
    const ex = prev.find(i => i.itemId === item._id);
    if (ex) return prev.map(i => i.itemId === item._id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { itemId: item._id, stallId: stall._id, stallName: stall.name, name: item.name, price: item.price, qty: 1 }];
  });

  const remove = (itemId) => setItems(prev => prev.filter(i => i.itemId !== itemId));
  const setQty = (itemId, qty) => { if (qty <= 0) { remove(itemId); return; } setItems(prev => prev.map(i => i.itemId === itemId ? { ...i, qty } : i)); };
  const clear = () => setItems([]);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length * 5;
  const total = subtotal + delivery;

  return <CartContext.Provider value={{ items, add, remove, setQty, clear, totalQty, subtotal, delivery, total }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
