"use client"
import React, { useState } from 'react'

export default function PaymentActions({ meter, payments }: { meter: string; payments: any[] }) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)

  async function markPaid(index: number) {
    setLoadingIndex(index)
    try {
      const updated = payments.map((p, i) => {
        if (i === index) return { ...p, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
        return p
      })

      const arrears = updated.reduce((acc: number, p: any) => acc + (p.status !== 'paid' ? Number(p.amount || 0) : 0), 0)

      const body = { meter, payments: updated, arrears, balance: arrears }

      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Error updating')

      // refresh the page to show updated data
      window.location.reload()
    } catch (e) {
      // simple error feedback
      // eslint-disable-next-line no-alert
      alert('No se pudo marcar como pagado. Intenta de nuevo.')
      setLoadingIndex(null)
    }
  }

  return (
    <div>
      {payments.map((p, i) => (
        <div key={p.quarter} className="d-flex justify-content-end mt-2">
          {p.status === 'paid' && (
            <a className="btn btn-outline-secondary btn-sm" href={`/receipt?meter=${meter}&quarter=${encodeURIComponent(p.quarter)}`} target="_blank" rel="noreferrer">
              Ver recibo
            </a>
          )}

          {p.status === 'pending' && (
            <button className="btn btn-warning btn-sm" onClick={() => markPaid(i)} disabled={loadingIndex !== null}>
              {loadingIndex === i ? 'Procesando...' : 'Marcar como pagado'}
            </button>
          )}

          {p.status === 'overdue' && (
            <button className="btn btn-danger btn-sm" onClick={() => markPaid(i)} disabled={loadingIndex !== null}>
              {loadingIndex === i ? 'Procesando...' : 'Pagar ahora'}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
