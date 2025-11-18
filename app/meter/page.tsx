import React from 'react'
import PrintButton from '../../components/PrintButton'
import BackButton from '../../components/BackButton'

async function getUser(meter: string) {
  const res = await fetch(`http://localhost:3000/api/user/${meter}`)
  if (!res.ok) return null
  return res.json()
}

export default async function MeterPage({ searchParams }: { searchParams?: { meter?: string } }) {
  const meter = searchParams?.meter
  if (!meter) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Número de medidor no proporcionado</h1>
        <BackButton />
      </div>
    )
  }

  const user = await getUser(meter)
  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Medidor no encontrado</h1>
        <BackButton />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <BackButton />
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <div className="muted">Medidor: <strong className="text-gray-800">{user.meter}</strong></div>
          <div className="muted">Dirección: {user.address}</div>
        </div>
        <div className="text-right">
          <div className="text-sm muted">Balance pendiente</div>
          <div className="text-xl font-semibold text-red-600">${user.balance}</div>
        </div>
      </div>

      <section className="card">
        <h2 className="font-semibold mb-2">Historial de consumo</h2>
        <ul className="list-disc ml-6">
          {user.consumption.map((c: any) => (
            <li key={c.month}>{c.month}: {c.kwh} kWh</li>
          ))}
        </ul>
      </section>

      <section className="flex items-center gap-3">
        <PrintButton />
      </section>

      <section className="card">
        <h2 className="font-semibold">Reportar irregularidad</h2>
        <form action="/api/reports" method="post" className="mt-2 space-y-2">
          <input type="hidden" name="meter" value={user.meter} />
          <div>
            <select name="type" className="border px-2 py-1 rounded w-full">
              <option>Falla de servicio</option>
              <option>Lectura incorrecta</option>
              <option>Otro</option>
            </select>
          </div>
          <textarea name="description" placeholder="Describe la irregularidad" className="w-full border p-2 rounded mb-2" />
          <button className="px-3 py-2 bg-red-600 text-white rounded">Enviar reporte</button>
        </form>
      </section>
    </div>
  )
}
