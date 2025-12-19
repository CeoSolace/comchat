import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './api'

export function useHubs() {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      const { data } = await api.get('/api/hubs')
      return data
    }
  })
}

export function useHub(id: string) {
  return useQuery({
    queryKey: ['hub', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/hubs/${id}`)
      return data
    },
    enabled: !!id
  })
}

export function useCreateHub() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post('/api/hubs', { name })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] })
    }
  })
}

export function useChannelMessages(channelId: string) {
  return useQuery({
    queryKey: ['messages', channelId],
    queryFn: async () => {
      const { data } = await api.get(`/api/channels/${channelId}/messages`)
      return data
    },
    enabled: !!channelId
  })
}

export function useSendMessage(channelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (content: string) => {
      const { data } = await api.post(`/api/channels/${channelId}/messages`, { content })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] })
    }
  })
}

TODO: Create hooks for DMs and roles