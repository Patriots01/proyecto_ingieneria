'use client'
import { useState } from 'react'

export default function ReconnectButton({ meter, onSuccess }: { meter: string; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleReconnect() {
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/reconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meter }),
      })

      if (!res.ok) {
        const data = await res.json()
        setMessage(`Error: ${data.error}`)
        setLoading(false)
        return
      }

      setMessage('✓ Servicio reconectado exitosamente')
      setLoading(false)
      
      // Refresh page after 1 second to show updated status
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setMessage('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleReconnect}
        disabled={loading}
        className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs rounded"
      >
        {loading ? 'Procesando...' : 'Reconectar'}
      </button>
      {message && <div className="text-xs mt-1 text-green-600">{message}</div>}
    </div>
  )
}
