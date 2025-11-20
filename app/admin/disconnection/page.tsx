import React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import DisconnectButton from '../../../components/DisconnectButton'

async function getUsers() {
  const dataPath = path.join(process.cwd(), 'data', 'users.json')
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

export const revalidate = 0

export default async function DisconnectionPage({ searchParams }: { searchParams?: { worker?: string } }) {
  const worker = searchParams?.worker
  const users = await getUsers()

  // Filter users with arrears (candidates for disconnection) and currently connected
  const arrearsUsers = users.filter((u: any) => 
    u.role !== 'admin' && u.arrears > 0 && (u.serviceStatus === 'connected' || !u.serviceStatus)
  )

  // Show disconnected users separately
  const disconnectedUsers = users.filter((u: any) => 
    u.role !== 'admin' && u.serviceStatus === 'disconnected'
  )

  return (
    <div>
      <div className="mb-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Link href={`/admin/dashboard?worker=${worker}`} className="text-blue-600 hover:underline">
            ← Volver al panel
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Gestión de Desconexiones</h1>
        <p className="text-gray-600 mt-1">Solicitudes de corte de servicio por falta de pago</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm text-red-600 font-medium">Usuarios en Mora (Conectados)</div>
          <div className="text-3xl font-bold text-red-900">{arrearsUsers.length}</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-sm text-orange-600 font-medium">Adeudo Total</div>
          <div className="text-3xl font-bold text-orange-900">
            ${arrearsUsers.reduce((s: number, u: any) => s + u.arrears, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 font-medium">Ya Desconectados</div>
          <div className="text-3xl font-bold text-gray-900">{disconnectedUsers.length}</div>
        </div>
      </div>

      {arrearsUsers.length > 0 && (
        <section className="card mb-6">
          <h2 className="font-semibold mb-4">Usuarios Elegibles para Desconexión</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="px-3 py-2">Medidor</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Adeudo</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {arrearsUsers.map((u: any) => (
                  <tr key={u.meter} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{u.meter}</td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-red-600 font-semibold">${u.arrears.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Conectado
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <DisconnectButton meter={u.meter} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {disconnectedUsers.length > 0 && (
        <section className="card">
          <h2 className="font-semibold mb-4">Usuarios Desconectados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="px-3 py-2">Medidor</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Adeudo</th>
                  <th className="px-3 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {disconnectedUsers.map((u: any) => (
                  <tr key={u.meter} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{u.meter}</td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-red-600 font-semibold">${u.arrears.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                        Desconectado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
