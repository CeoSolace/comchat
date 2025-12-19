export interface MentionResult {
  userIds: string[]
  roleIds: string[]
  everyone: boolean
  here: boolean
}

const USER_REGEX = /@([a-zA-Z0-9_]{2,32})/g
const ROLE_REGEX = /@\{role:([a-f0-9]{24})\}/g

export function parseMentions(content: string, limit = 5): MentionResult {
  const userIds: string[] = []
  const roleIds: string[] = []
  let everyone = false
  let here = false
  if (content.includes('@everyone')) everyone = true
  if (content.includes('@here')) here = true
  let match: RegExpExecArray | null
  while ((match = USER_REGEX.exec(content)) !== null) {
    if (userIds.length >= limit) break
    const username = match[1]
    userIds.push(username)
  }
  while ((match = ROLE_REGEX.exec(content)) !== null) {
    if (roleIds.length >= limit) break
    const roleId = match[1]
    roleIds.push(roleId)
  }
  return { userIds, roleIds, everyone, here }
}

TODO: Enhance mention parsing to resolve IDs by name server‑side