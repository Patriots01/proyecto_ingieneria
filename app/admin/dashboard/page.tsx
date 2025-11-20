import React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import AdminLogoutButton from '../../../components/AdminLogoutButton'

async function getUsers() {
  const dataPath = path.join(process.cwd(), 'data', 'users.json')
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

export default async function AdminDashboard({ searchParams }: { searchParams?: { worker?: string, meter?: string } }) {
  const worker = searchParams?.worker
  if (!worker) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
        <p className="mt-2">Por favor, <Link href="/admin/login" className="text-blue-600 hover:underline">inicie sesión</Link> primero.</p>
      </main>
    )
  }

  const users = await getUsers()
  // Get admin info from worker (employeeId)
  const admin = users.find((u: any) => u.role === 'admin' && u.employeeId === worker)

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Panel Administrador</h1>
          {admin && (
            <div className="text-sm text-gray-600 mt-1">
              Bienvenido, <strong>{admin.name}</strong> ({admin.adminType})
            </div>
          )}
        </div>
        <AdminLogoutButton />
      </div>

      {/* Admin-specific sections based on adminType */}
      {admin?.adminType === 'disconnection' && (
        <section className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-semibold text-red-900 mb-2">Área de Desconexión de Servicio</h3>
          <p className="text-sm text-red-800 mb-3">Gestionar solicitudes de desconexión por falta de pago.</p>
          <Link href={`/admin/disconnection?worker=${worker}`} className="btn btn-danger">
            Ver Desconexiones
          </Link>
        </section>
      )}

      {admin?.adminType === 'reconnection' && (
        <section className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Área de Reconexión de Servicio</h3>
          <p className="text-sm text-green-800 mb-3">Gestionar solicitudes de reconexión después del pago.</p>
          <Link href={`/admin/reconnection?worker=${worker}`} className="btn btn-success">
            Ver Reconexiones
          </Link>
        </section>
      )}

      <section className="mb-4">
        <form method="get" className="flex gap-2">
          <input name="meter" placeholder="Buscar por número de medidor" className="border px-3 py-2 rounded flex-1" />
          <input type="hidden" name="worker" value={worker} />
          <button className="btn btn-primary">Buscar</button>
        </form>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-3 py-2">Medidor</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Balance</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.filter((u: any) => u.role !== 'admin').map((u: any) => (
                <tr key={u.meter} className="border-t">
                  <td className="px-3 py-2">{u.meter}</td>
                  <td className="px-3 py-2">{u.name}</td>
                  <td className="px-3 py-2">${u.balance}</td>
                  <td className="px-3 py-2">
                    <a className="text-blue-600 hover:underline" href={`/meter?meter=${u.meter}`}>Ver</a>
                    {' · '}
                    <a className="text-green-600 hover:underline" href={`/admin/edit?meter=${u.meter}`}>Editar</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
