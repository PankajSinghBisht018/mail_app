import React from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from '@/components/magicui/marquee';
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from '@/components/ui/card';
import {Avatar,AvatarFallback,AvatarImage} from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Arjun Mehta',
    title: 'CEO, Tech Solutions',
    message: 'This service is fantastic! Highly recommend to everyone.',
    avatar: 'https://thumbs.dreamstime.com/b/generative-ai-young-smiling-man-avatar-man-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-d-vector-people-279560903.jpg',
  },
  {
    name: 'Rohan Patel',
    title: 'CTO, Innovate Labs',
    message: 'Absolutely wonderful experience. Great support!',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_CupE0osWPIUt_ogRJFo8V7fKgHUsGmJuA&s',
  },
  {
    name: 'Vikram Singh',
    title: 'Founder, Startup Inc',
    message: 'A seamless integration into our workflow.',
    avatar: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/321830247/original/aa20bcdaa1ed769431a116d0eaeb3ad3c2134c10/revolutionize-your-image-with-a-personalized-ai-avatar.jpg',
  },
  {
    name: 'Rajesh Kumar',
    title: 'Manager, Business Corp',
    message: 'Exceeded our expectations in every way.',
    avatar: 'https://cdn.hackernoon.com/images/bfqrt3x6hAVgXkezEqVTPC5AAFA2-lbc3lp3.jpeg',
  },
  {
    name: 'Amit Sharma',
    title: 'Developer, CodeWorks',
    message: 'Incredible tool for developers!',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb0g8sbMI3o6UqzcM_32Q5BAWqEmy8ue-NK4n4vMpPVWyg7aeyXaA_zK0CLW1H5Kt9wwQ&usqp=CAU',
  },
  {
    name: 'Kunal Joshi',
    title: 'Designer, Creatives Studio',
    message: 'Design process is now so much smoother.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1aAGk4PuUU1-tltdZVjyXr2ZOt4RVkrRLeZaH99KTxhM1iyRwhIE9wPr3rs6SCpy22PI&usqp=CAU',
  },
];

const TestimonialPage = () => {
  return (
    <Box sx={{ backgroundColor: 'black', minHeight: '50vh', p: 4 }}>
      <Typography variant="h3" align="center" color="white" gutterBottom>
        What Our Clients Say
      </Typography>
      <Marquee>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              m: 2,
              backgroundColor: 'gray.800',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <CardHeader>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto' }}> 
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Box sx={{ mt: 1 }}>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription sx={{ color: 'black' }}>{testimonial.title}</CardDescription>
              </Box>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" color="black">
                {testimonial.message}
              </Typography>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </Marquee>
    </Box>
  );
};

export default TestimonialPage;
