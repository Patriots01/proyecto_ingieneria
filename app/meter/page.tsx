import React from 'react'
import PrintButton from '../../components/PrintButton'
import BackButton from '../../components/BackButton'
import PaymentActions from '../../components/PaymentActions'
import fs from 'fs'
import path from 'path'

export const revalidate = 0 // Disable caching for this page

async function getUser(meter: string) {
  const dataPath = path.join(process.cwd(), 'data', 'users.json')
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const users = JSON.parse(raw)
    return users.find((u: any) => u.meter === meter) || null
  } catch (e) {
    return null
  }
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
          {user.arrears > 0 && (
            <div className="mt-2 text-sm muted">Adeudos: <strong className="text-red-600">${user.arrears}</strong></div>
          )}
        </div>
      </div>

      {user.payments && user.payments.length > 0 && (
        <section className="card">
          <h2 className="font-semibold mb-3">Estado de pagos trimestrales</h2>
          <div className="space-y-2">
            {user.payments.map((payment: any) => (
              <div key={payment.quarter} className="flex items-center justify-between p-3 border rounded bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-800">{payment.quarter}</div>
                  <div className="text-sm muted">${payment.amount}</div>
                </div>
                <div className="text-right">
                  {payment.status === 'paid' && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">✓ Pagado</span>
                  )}
                  {payment.status === 'pending' && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"> Pendiente</span>
                  )}
                  {payment.status === 'overdue' && (
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">✕ Vencido</span>
                  )}
                  <div className="text-xs muted mt-1">
                    {payment.paidDate ? 'Pagado: ' + payment.paidDate : 'Vence: ' + payment.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <PaymentActions meter={user.meter} payments={user.payments} />
          </div>
        </section>
      )}

      <section className="card">
        <h2 className="font-semibold mb-2">Historial de consumo</h2>
        <ul className="list-disc ml-6">
          {user.consumption.map((c: any) => (
            <li key={c.month}>{c.month}: {c.kwh} kWh</li>
          ))}
        </ul>
      </section>

      {/* Printable receipt block (only this will be printed when using the button) */}
      <section id="receipt-to-print" className="card">
        <div className="d-flex justify-content-between items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <img src="/cfe_icon.jpeg" alt="CFE" style={{width:72,height:72,objectFit: 'cover', borderRadius:8}} />
            <div>
              <div className="font-semibold">CFE - Suministrador de Servicios Básicos</div>
              <div className="text-sm muted">Recibo trimestral</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm muted">Cuenta / Medidor</div>
            <div className="font-semibold">{user.meter}</div>
          </div>
        </div>

        <div className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="text-sm muted">Cliente</div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm muted">{user.address}</div>
            </div>
            <div className="text-right">
              <div className="text-sm muted">Total a pagar</div>
              <div className="text-xl font-bold">${(() => {
                const unpaid = (user.payments || []).filter((p: any) => p.status !== 'paid')
                const total = unpaid.reduce((s: number, p: any) => s + Number(p.amount || 0), 0)
                return total.toFixed(2)
              })()}</div>
            </div>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Detalle de pagos (trimestral)</h3>
        <table className="w-100" style={{borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th className="text-left">Trimestre</th>
              <th className="text-right">Importe</th>
              <th className="text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            {(user.payments || []).map((p: any) => (
              <tr key={p.quarter}>
                <td>{p.quarter}</td>
                <td className="text-right">${Number(p.amount).toFixed(2)}</td>
                <td className="text-right">{p.status === 'paid' ? 'Pagado' : p.status === 'pending' ? 'Pendiente' : 'Vencido'}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
