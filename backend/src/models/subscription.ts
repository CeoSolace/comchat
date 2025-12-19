import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  stripeCustomerId: { type: String, required: true },
  stripeSubscriptionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Subscription = mongoose.model('Subscription', SubscriptionSchema)

// TODO: Store entitlements and boost counts