const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

function getApiKey() {
  return import.meta.env.VITE_GROQ_API_KEY || ''
}

export function isGroqConfigured() {
  return Boolean(getApiKey())
}

/**
 * Send a chat message to Groq and return the assistant reply.
 * @param {Array<{ role: 'user' | 'system' | 'assistant', content: string }>} messages
 * @param {Object} options - { model?, max_tokens?, temperature? }
 * @returns {Promise<string>} Assistant message content
 */
export async function groqChat(messages, options = {}) {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('Groq API key not set. Add VITE_GROQ_API_KEY to your .env file.')
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options.model || 'llama-3.3-70b-versatile',
      messages,
      max_tokens: options.max_tokens ?? 1024,
      temperature: options.temperature ?? 0.7,
      stream: false,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || res.statusText || 'Groq request failed')
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}
