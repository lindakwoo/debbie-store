import express from "express";
import Stripe from "stripe";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import dotenv from "dotenv";
import { protectRoute } from "../middleware/authMiddleware.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeRoute = express.Router();
const url = process.env.NODE_ENV=='development'? 'http://localhost:3000/':`https://debbie-elye.onrender.com/`;

const stripePayment = async (req, res) => {
  const data = req.body;

  let lineItems = [];

  if (data.shipping == 14.99) {
    lineItems.push({
      price: process.env.EXPRESS_SHIPPING_ID,
      quantity: 1,
    });
  } else {
    lineItems.push({
      price: process.env.STANDARD_SHIPPING_ID,
      quantity: 1,
    });
  }

  data.cartItems.forEach((item) => {
    lineItems.push({
      price: item.stripeId,
      quantity: item.qty,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${url}success`,
    cancel_url: `${url}cancel`,
  });

  const order = new Order({
    orderItems: data.cartItems,
    user: data.userInfo._id,
    username: data.userInfo.name,
    email: data.userInfo.email,
    shippingAddress: data.shippingAddress,
    shippingPrice: data.shipping,
    subtotal: data.subtotal,
    totalPrice: (Number(data.subtotal) + Number(data.shipping)).toFixed(2),
  });

  const newOrder = await order.save();

  data.cartItems.forEach(async (cartItem) => {
    let product = await Product.findById(cartItem.id);
    product.stock = product.stock - cartItem.qty;
    product.save();
  });

  res.send(
    JSON.stringify({
      orderId: newOrder._id.toString(),
      url: session.url,
    })
  );
};

stripeRoute.route("/").post(protectRoute, stripePayment);

export default stripeRoute;
