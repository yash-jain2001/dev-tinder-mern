const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const membershipAmount = require("../utils/constants");
const config = require("../config/config");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, email } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        email,
        membershipType: membershipType,
      },
    });
    //save it in my database
    console.log(order);
    const payment = new Payment({
      paymentId: order.id,
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();

    // Send order details to frontend for Razorpay checkout
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
      keyId: config.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      config.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    //Update my payment in DB
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    payment.status = paymentDetails.status;
    await payment.save();

    // Only update the user as premium if the payment was successful
    if (req.body.event === "payment.captured") {
      const user = await User.findOne({ _id: payment.userId });
      if (user) {
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        await user.save();
      }
    }

    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async(req, res)=>{
  const user = req.user;
  if(user.isPremium){
   return res.json({isPremium: true})
  }
  return res.json({isPremium: false})
})

module.exports = paymentRouter;
