import React from 'react';
import { Button } from 'primereact/button';
import useCartStore from '../store/useCartStore';
import { motion } from 'framer-motion';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <motion.div className='bg-gradient-to-r from-purple-900 to-black min-h-screen' >
    <div className="container mx-auto py-12 px-24">
      <h2 className="text-3xl font-bold text-center mb-8  text-white">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-2xl text-center  text-white">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left py-2 px-4">Item</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">₹{item.price}</td>
                  <td className="py-2 px-4">
                    <Button
                      label="Remove"
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default Cart;
