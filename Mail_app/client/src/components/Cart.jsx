import React, { useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import { motion } from 'framer-motion';
import ShimmerButton from '@/components/magicui/shimmer-button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import axios from 'axios'; 

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

      const { data } = await axios.post('http://localhost:8000/api/create-order', {
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
        <div className="container mx-auto py-12 px-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-2xl text-center text-white">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="relative border bg-background">
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
          <div className="flex justify-end mt-7">
            <ShimmerButton className="shadow-2xl p-button p-button-success" onClick={handlePlaceOrder}>
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white">
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
