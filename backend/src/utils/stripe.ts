import Stripe from 'stripe'
import { config } from '../config'

export const stripe = new Stripe(config.stripeSecretKey, { apiVersion: '2023-10-16' })

export async function createCheckoutSession(userId: string, priceId: string): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer: undefined,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: `${config.clientUrl}/billing/success`,
    cancel_url: `${config.clientUrl}/billing/cancel`,
    metadata: { userId }
  })
  return session.url || ''
}

export async function handleWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      break
    default:
      break
  }
}

// TODO: Implement dynamic price creation and subscription updates