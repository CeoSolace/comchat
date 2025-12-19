export enum PermissionFlags {
  ViewChannels = 1 << 0,
  ReadMessageHistory = 1 << 1,
  SendMessages = 1 << 2,
  SendAttachments = 1 << 3,
  EmbedLinks = 1 << 4,
  AddReactions = 1 << 5,
  MentionEveryone = 1 << 6,
  ManageMessages = 1 << 7,
  ManageChannels = 1 << 8,
  ManageCategories = 1 << 9,
  ManageRoles = 1 << 10,
  ManageMembers = 1 << 11,
  Moderate = 1 << 12,
  CreateInvites = 1 << 13,
  ManageInvites = 1 << 14,
  ManageWebhooks = 1 << 15,
  ManageBots = 1 << 16,
  ViewAuditLog = 1 << 17,
  Administrator = 1 << 30
}

export type PermissionBitset = number

export function hasPermission(bitset: PermissionBitset, flag: PermissionFlags): boolean {
  return (bitset & flag) === flag
}

export function combinePermissions(flags: PermissionFlags[]): PermissionBitset {
  return flags.reduce((bits, f) => bits | f, 0)
}

export interface Override {
  allow: PermissionBitset
  deny: PermissionBitset
}

export function applyOverride(base: PermissionBitset, override: Override): PermissionBitset {
  return (base & ~override.deny) | override.allow
}

TODO: Implement granular override resolution with role priorities