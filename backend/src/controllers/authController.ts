import { Request, Response } from 'express'
import { config } from '../config'
import { exchangeCode, getUser as getDiscordUser } from '../utils/discord'
import { User } from '../models'


export async function login(req: Request, res: Response) {
  const params = new URLSearchParams({
    client_id: config.discordClientId,
    redirect_uri: `${config.clientUrl}/login/callback`,
    response_type: 'code',
    scope: 'identify email'
  })
  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`)
}

export async function callback(req: Request, res: Response) {
  const code = req.query.code as string
  if (!code) {
    return res.status(400).send('Missing code')
  }
  try {
    const token = await exchangeCode(code, `${config.clientUrl}/login/callback`)
    const discordUser = await getDiscordUser(token.access_token)
    let user = await User.findOne({ discordId: discordUser.id })
    if (!user) {
      const isOwner = config.ownerDiscordId === discordUser.id
      user = await User.create({ discordId: discordUser.id, username: discordUser.username, avatar: discordUser.avatar, discriminator: discordUser.discriminator, isOwner })
    }
    ;(req as any).session.userId = user.id
    res.redirect(`${config.clientUrl}/hubs`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Authentication failed')
  }
}

export async function logout(req: Request, res: Response) {
  req.session = null as any
  res.status(200).json({ message: 'Logged out' })
}

export async function me(req: Request, res: Response) {
  const user: any = (req as any).user
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  res.json({ id: user.id, username: user.username, avatar: user.avatar, discriminator: user.discriminator, isOwner: user.isOwner })
}

TODO: Store refresh tokens securely and implement revoke