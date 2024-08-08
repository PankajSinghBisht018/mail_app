import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridPattern from '@/components/magicui/grid-pattern';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

const Pricing = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isYearly, setIsYearly] = useState(false);

  const products = [
    { id: 1, title: 'Basic Plan', monthlyPrice: 200, yearlyPrice: 2000 },
    { id: 2, title: 'Premium Plan', monthlyPrice: 400, yearlyPrice: 4000 },
    { id: 3, title: 'Enterprise Plan', monthlyPrice: 800, yearlyPrice: 8000 },
  ];

  const handleBuyNow = (product) => {
    const price = isYearly ? product.yearlyPrice : product.monthlyPrice;
    addToCart({ ...product, price });
    toast.success(`Added ${product.title} to cart for ₹${price}.`);
  };

  return (
    <motion.div
      className="relative min-h-screen py-12 px-4 md:px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Helmet>
        <title>Mail Vista - Pricing  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <GridPattern className="absolute inset-0 opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl mb-4">Choose the plan that suits your needs.</p>
          <div className="flex justify-center items-center mb-8">
            <span className="mr-2">Monthly</span>
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(prev => !prev)} />
            <span className="ml-2">Yearly</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="mx-auto w-full max-w-sm md:max-w-md">
              {index === 1 ? (
                <NeonGradientCard className="max-w-sm items-center justify-center" >
                    <CardContent product={product} isYearly={isYearly} handleBuyNow={handleBuyNow} />
                </NeonGradientCard>
              ) : (
                <Card className="p-8 rounded-3xl shadow-xl border-4 border-gray-400">
                  <CardContent product={product} isYearly={isYearly} handleBuyNow={handleBuyNow} />
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const CardContent = ({ product, isYearly, handleBuyNow }) => {
  const features = {
    basic: [
      { text: 'Access to basic features', included: true },
      { text: 'Email support', included: true },
      { text: 'Access to standard templates', included: true },
      { text: 'Schedule mailing', included: true }, 
      { text: 'Priority support', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
    premium: [
      { text: 'Access to premium features', included: true },
      { text: 'Email support', included: true },
      { text: 'Access to premium templates', included: true },
      { text: 'Schedule mailing', included: true }, 
      { text: 'Priority support', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
    enterprise: [
      { text: 'Access to premium features', included: true },
      { text: 'Email support', included: true },
      { text: 'Access to premium templates', included: true },
      { text: 'Schedule mailing', included: true }, 
      { text: 'Priority support', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
  };

  const planType = product.title.toLowerCase().split(' ')[0]; 
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        {isYearly && (
          <div className="px-3 py-1 rounded-xl bg-gradient-to-tl from-yellow-600 to-orange-700 text-white">
            Save ₹{product.monthlyPrice * 12 - product.yearlyPrice}
          </div>
        )}
      </div>
      <div className="flex gap-0.5 items-baseline mb-4">
        <h3 className="text-4xl font-bold">
          ₹{isYearly ? product.yearlyPrice : product.monthlyPrice}
        </h3>
        <span className="text-lg">{isYearly ? "/year" : "/month"}</span>
      </div>
      <p className="mt-2 mb-4 text-sm">Ideal for {product.title.toLowerCase()}.</p>
      <div className="flex flex-col gap-2 mb-4">
        {features[planType].map((feature, index) => (
          <CheckItem key={index} text={feature.text} type={feature.included ? 'check' : 'cross'} />
        ))}
      </div>
      <Button
        className="relative inline-flex w-full items-center justify-center rounded-md px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={() => handleBuyNow(product)}
      >
        <div className="absolute -inset-0.5  rounded-lg bg-gradient-to-b from-white to-black  opacity-75 blur" />
        Buy Now
      </Button>
    </>
  );
};

const CheckItem = ({ text, type }) => (
  <div className="flex items-center mb-2">
    {type === 'check' ? (
      <i className="pi pi-check-circle text-green-500 mr-2"></i>
    ) : (
      <i className="pi pi-times-circle text-red-500 mr-2"></i>
    )}
    <span>{text}</span>
  </div>
);

export default Pricing;
