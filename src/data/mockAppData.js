// Mock data for the in-app experience (dashboard highlights & saved videos)

export const HIGHLIGHT_TYPES = {
  ALTERCATION: 'altercation',
  FUNNY: 'funny',
  CONVERSATION: 'conversation',
  IMPORTANT: 'important',
  OTHER: 'other',
}

// Friendly labels for event types (AI-detected, nice & straightforward)
export const EVENT_TYPE_LABELS = {
  [HIGHLIGHT_TYPES.ALTERCATION]: 'Tense moments',
  [HIGHLIGHT_TYPES.FUNNY]: 'Funny moments',
  [HIGHLIGHT_TYPES.CONVERSATION]: 'Conversations',
  [HIGHLIGHT_TYPES.IMPORTANT]: 'Key moments',
  [HIGHLIGHT_TYPES.OTHER]: 'Other',
}

export const mockHighlights = [
  { id: '1', time: '09:14', label: 'Conversation', type: HIGHLIGHT_TYPES.CONVERSATION, duration: '2:34', thumbnail: null },
  { id: '2', time: '12:02', label: 'Funny moment', type: HIGHLIGHT_TYPES.FUNNY, duration: '0:45', thumbnail: null },
  { id: '3', time: '14:22', label: 'Altercation', type: HIGHLIGHT_TYPES.ALTERCATION, duration: '1:12', thumbnail: null },
  { id: '4', time: '16:45', label: 'Important', type: HIGHLIGHT_TYPES.IMPORTANT, duration: '3:01', thumbnail: null },
  { id: '5', time: '18:30', label: 'Funny moment', type: HIGHLIGHT_TYPES.FUNNY, duration: '0:22', thumbnail: null },
]

export const mockSavedVideos = [
  { id: 'v1', time: '08:00', duration: '4:12', title: 'Morning routine', monthKey: '2025-02' },
  { id: 'v2', time: '09:14', duration: '2:34', title: 'Conversation — coffee', monthKey: '2025-02' },
  { id: 'v3', time: '10:45', duration: '1:05', title: 'Commute', monthKey: '2025-02' },
  { id: 'v4', time: '12:02', duration: '0:45', title: 'Funny moment', monthKey: '2025-02' },
  { id: 'v5', time: '13:00', duration: '15:22', title: 'Work block', monthKey: '2025-02' },
  { id: 'v6', time: '14:22', duration: '1:12', title: 'Altercation', monthKey: '2025-02' },
  { id: 'v7', time: '15:30', duration: '2:00', title: 'Meeting', monthKey: '2025-01' },
  { id: 'v8', time: '16:45', duration: '3:01', title: 'Important', monthKey: '2025-01' },
  { id: 'v9', time: '18:30', duration: '0:22', title: 'Funny moment', monthKey: '2025-01' },
  { id: 'v10', time: '19:00', duration: '8:44', title: 'Evening', monthKey: '2025-01' },
]
