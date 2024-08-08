import React, { useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { API_URL } from '../services/helper';
import GridPattern from '@/components/magicui/grid-pattern';
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material'; 
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
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
      const amountInPaise = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      <motion.div className='relative min-h-screen'>
      <Helmet>
        <title>Mail Vista - Cart  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
        <GridPattern className="absolute inset-0 z-0" /> 
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-xl text-center ">Your cart is empty.</p>
          ) : (
            <Table className="bg-gray-800 text-white"> 
              <TableCaption>Your cart items.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          className="mr-2"
                          onClick={() => decreaseQuantity(item.id)}
                          size="small"
                          variant="outlined"
                          color="inherit"
                        >
                          <RemoveIcon />
                        </Button>
                        {item.quantity}
                        <Button
                          className="ml-2"
                          onClick={() => increaseQuantity(item.id)}
                          size="small"
                          variant="outlined"
                          color="inherit"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <RemoveIcon />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
          <div className="flex justify-end mt-6">
            <Button
              className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg"
              onClick={handlePlaceOrder}
            >
              <span className="whitespace-nowrap text-sm font-medium">
                Place Order
              </span>
            </Button>
          </div>
        </div>
        <ToastContainer />
      </motion.div>
    </>
  );
};

export default Cart;
