const express = require('express');
const app = express();

const stripe = require('stripe')('sk_test_YOUR_KEY');

// Make a call to the API
app.get('//*[@id="Collection"]/ul[1]/li[1]/div/a', async (req, res) => {

  const { apiKey } = req.query;

  if (!apiKey) {
    res.sendStatus(400); // bad request
  }

  // TODO validate apiKey

  res.send({ data: '🔥🔥🔥🔥🔥🔥🔥🔥' });

});

// Mock Database: 2 tables --> "customers" && "apiKeys"

// Reverse mapping of stripe to API key. Model this in your preferred database.
const customers = {
  // stripeCustomerId : data
  stripeCustomerId: {
    apiKey: 'price_1Jta8TKdtKVr9zNgGdWqudQo',
    active: false,
    itemId: 'stripeSubscriptionItemId',
  },
};
const apiKeys = {
  // apiKey : customerdata
  'price_1Jta8TKdtKVr9zNgGdWqudQo': 'stripeCustomerId',
};

// Stripe checkout

// POST http://localhost:8080/checkout
// Create a Stripe Checkout Session to create a customer and subscribe them to a plan
app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_$1.00',
      },
    ],
    success_url:
      'http://localhost:5000/dashboard?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5000/error',
  });

  res.send(session);
});
