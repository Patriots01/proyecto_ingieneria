import React from 'react'

async function getUser(meter: string) {
  const res = await fetch(`http://localhost:3000/api/user/${meter}`)
  if (!res.ok) return null
  return res.json()
}

export default async function AdminEdit({ searchParams }: { searchParams?: { meter?: string } }) {
  const meter = searchParams?.meter
  if (!meter) return (<main><h1>Falta medidor</h1></main>)
  const user = await getUser(meter)
  if (!user) return (<main><h1>Usuario no encontrado</h1></main>)

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Editar usuario {user.meter}</h1>
      <form method="post" action="/api/users?_method=put" className="space-y-4 bg-white p-4 rounded shadow">
        <input name="meter" defaultValue={user.meter} className="hidden" />
        <div>
          <label className="block text-sm muted">Balance</label>
          <input name="balance" defaultValue={user.balance} className="border px-2 py-1 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm muted">Dirección</label>
          <input name="address" defaultValue={user.address} className="border px-2 py-1 rounded w-full" />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">Guardar</button>
          <a className="btn btn-ghost" href={`/meter?meter=${user.meter}`}>Volver</a>
        </div>
      </form>
    </div>
  )
}
