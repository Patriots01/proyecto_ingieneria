"use client"
import React, { useState } from 'react'

export default function ReportForm({ meter }: { meter?: string }) {
  const [type, setType] = useState('Falla de servicio')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meter, type, description })
      })
      if (!res.ok) throw new Error('Error')
      setStatus('ok')
      setDescription('')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm muted">Tipo</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="border px-2 py-1 rounded w-full">
            <option>Falla de servicio</option>
            <option>Lectura incorrecta</option>
            <option>Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm muted">Descripción</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border px-2 py-1 rounded w-full" rows={4} />
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-cfe" disabled={status==='sending'}>{status==='sending'?'Enviando...':'Enviar reporte'}</button>
          {status==='ok' && <div className="text-green-600">Reporte enviado</div>}
          {status==='error' && <div className="text-red-600">Error al enviar</div>}
        </div>
      </form>
    </div>
  )
}
