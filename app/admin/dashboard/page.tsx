import React from 'react'
import fs from 'fs'
import path from 'path'

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
      <main>
        <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
        <p>Falta número de trabajador en la consulta.</p>
      </main>
    )
  }

  const users = await getUsers()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Panel Administrador</h1>
        <div className="muted">Trabajador {worker}</div>
      </div>

      <section className="mb-4">
        <form method="get" className="flex gap-2">
          <input name="meter" placeholder="Buscar por número de medidor" className="border px-3 py-2 rounded flex-1" />
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
              {users.map((u: any) => (
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
