import axios from 'axios'
import { config } from '../config'

const API_BASE = 'https://discord.com/api/v10'

export async function exchangeCode(code: string, redirectUri: string) {
  const data = new URLSearchParams({
    client_id: config.discordClientId,
    client_secret: config.discordClientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri
  })
  const res = await axios.post(`${API_BASE}/oauth2/token`, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  return res.data
}

export async function getUser(accessToken: string) {
  const res = await axios.get(`${API_BASE}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return res.data
}

TODO: Implement token refresh for persistent sessions