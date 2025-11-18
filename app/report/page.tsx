import React from 'react'
import ReportForm from '../../components/ReportForm'
import BackButton from '../../components/BackButton'

export default function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <BackButton />
      <h1 className="text-2xl font-bold brand">Reportar irregularidad</h1>
      <p className="muted">Cuéntanos qué sucede con tu suministro y lo revisaremos.</p>

      <div className="mt-4">
        <ReportForm />
      </div>

      <div className="mt-6">
        <a href="/" className="text-sm muted">Volver al inicio</a>
      </div>
    </div>
  )
}
