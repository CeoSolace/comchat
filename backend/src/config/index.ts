import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGODB_URI || '',
  discordClientId: process.env.DISCORD_CLIENT_ID || '',
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET || '',
  sessionSecret: process.env.SESSION_SECRET || '',
  ownerDiscordId: process.env.OWNER_DISCORD_ID || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
  ,
  nodeEnv: process.env.NODE_ENV || 'development'
}

TODO: Validate presence of required configuration values