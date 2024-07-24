import React, { useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import { motion } from 'framer-motion';
import ShimmerButton from '@/components/magicui/shimmer-button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import axios from 'axios'; 
import { API_URL } from '../services/helper';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript().then((loaded) => {
      if (!loaded) {
        console.error("Failed to load Razorpay script");
      }
    });
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const amountInPaise = cartItems.reduce((acc, item) => acc + item.price, 0);

      const { data } = await axios.post(`${API_URL}/api/create-order`, {
        amount: amountInPaise,
        currency: 'INR',
        items: cartItems,
      });

      const { id: order_id, amount, currency } = data;
      const options = {
        key: 'rzp_test_KRdMc1g1VN0aeE', 
        amount,
        currency,
        name: 'Mail Plans',
        description: 'Order Payment',
        order_id,
        handler: function (response) {
          toast.success(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
          resetCart();
        },
        prefill: {
          name: 'Pankaj',
          email: 'pankaj@gmail.com',
          contact: '123456789',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error placing order:', error.message);
      toast.error('Failed to place order');
    }
  };

  return (
    <>
      <motion.div className='bg-gradient-to-r from-purple-900 to-black min-h-screen'>
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-xl text-center text-white">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="relative border bg-background rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Item</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">₹{item.price}</td>
                        <td className="px-4 py-2 text-sm">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <ShimmerButton className="shadow-2xl p-button p-button-success" onClick={handlePlaceOrder}>
              <span className="whitespace-nowrap text-sm font-medium text-white">
                Place Order
              </span>
            </ShimmerButton>
          </div>
        </div>
        <ToastContainer />
      </motion.div>
    </>
  );
};

export default Cart;
