import React from 'react';
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore'; 
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pricing() {
  const addToCart = useCartStore((state) => state.addToCart);

  const products = [
    { id: 1, title: 'Basic Plan', price: 200 },
    { id: 2, title: 'Premium Plan', price: 400 },
    { id: 3, title: 'Enterprise Plan', price: 800 },
  ];

  const handleBuyNow = (product) => {
    addToCart(product);
    toast.success(`Added ${product.title}.`);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-black to-purple-900 min-h-screen py-12 px-4 md:px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-7xl mx-auto">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl mb-8">Choose the plan that suits your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="col-span-1 lg:col-span-1">
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-medium text-black mb-4">{product.title}</h2>
                  <p className="text-lg mb-4">Ideal for {product.title.toLowerCase()}.</p>
                  <hr className="my-4 border-t border-gray-300" />
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-black">₹{product.price}</span>
                    <span className="ml-2 text-lg">/ month</span>
                  </div>
                  <ul className="list-none p-0 m-0">
                    <li className="flex items-center mb-2">
                      <i className="pi pi-check-circle text-green-500 mr-2"></i>
                      <span>Access to basic features</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <i className="pi pi-check-circle text-green-500 mr-2"></i>
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
                <Button
                  label="Buy Now"
                  icon="pi pi-shopping-cart"
                  className="p-button p-button-danger w-full mt-4"
                  onClick={() => handleBuyNow(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Pricing;
