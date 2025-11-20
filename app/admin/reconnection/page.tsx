import React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import ReconnectButton from '../../../components/ReconnectButton'

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

export default async function ReconnectionPage({ searchParams }: { searchParams?: { worker?: string } }) {
  const worker = searchParams?.worker
  const users = await getUsers()

  // Filter users that are disconnected (candidates for reconnection)
  const disconnectibleUsers = users.filter((u: any) => 
    u.role !== 'admin' && u.serviceStatus === 'disconnected'
  )

  // Show connected users
  const connectedUsers = users.filter((u: any) => 
    u.role !== 'admin' && (u.serviceStatus === 'connected' || !u.serviceStatus)
  )

  return (
    <div>
      <div className="mb-4 pb-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Link href={`/admin/dashboard?worker=${worker}`} className="text-blue-600 hover:underline">
            ← Volver al panel
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Gestión de Reconexiones</h1>
        <p className="text-gray-600 mt-1">Procesar reconexiones de servicio después del pago</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm text-red-600 font-medium">Pendientes de Reconexión</div>
          <div className="text-3xl font-bold text-red-900">{disconnectibleUsers.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-600 font-medium">Al Día (Conectados)</div>
          <div className="text-3xl font-bold text-green-900">{connectedUsers.length}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium">Total de Usuarios</div>
          <div className="text-3xl font-bold text-blue-900">
            {users.filter((u: any) => u.role !== 'admin').length}
          </div>
        </div>
      </div>

      {disconnectibleUsers.length > 0 && (
        <section className="card mb-6">
          <h2 className="font-semibold mb-4">Usuarios Elegibles para Reconexión</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="px-3 py-2">Medidor</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Balance</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {disconnectibleUsers.map((u: any) => (
                  <tr key={u.meter} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{u.meter}</td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-green-600 font-semibold">${u.balance.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                        Desconectado
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <ReconnectButton meter={u.meter} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {connectedUsers.length > 0 && (
        <section className="card">
          <h2 className="font-semibold mb-4">Usuarios Conectados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="px-3 py-2">Medidor</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Balance</th>
                  <th className="px-3 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {connectedUsers.map((u: any) => (
                  <tr key={u.meter} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{u.meter}</td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-green-600 font-semibold">${u.balance.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Conectado
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
