
import { Router } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cart = Router()

cart.post('/', async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    const existingCart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (existingCart) {
      await prisma.cart.update({
        where: {
          id: existingCart.id,
        },
        data: {
          cartData,
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId,
          cartData,
        },
      });
    }

    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

cart.get('/', async (req, res) => {
  try {
    const { shop, accessToken } = res.locals;
    const isLoggedIn = isUserLoggedIn(req);
    if (isLoggedIn) {
      const userInfo = await fetchShopifyUserInfo(shop, accessToken);
      res.status(200).json({ message: 'Get your saved cart', showButton: true });
    } else {

    }
  } catch (error) {
    console.error('Error when restoring the recycle bin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

function isUserLoggedIn(req) {
  const authTokenHeader = req.headers.authorization;

  return !!authTokenHeader;
}

async function fetchShopifyUserInfo(shop, accessToken) {

  const apiUrl = `https://${shop}/admin/api/2022-01/shop.json`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Error when requesting Shopify API: ${response.statusText}`);
  }

  const data = await response.json();
  return data.shop;
}

export default cart;
