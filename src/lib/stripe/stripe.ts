import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
//   apiVersion: "2023-08-16",
apiVersion: "2024-04-10",
  typescript: true,
});
