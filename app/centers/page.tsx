import React from 'react'
import Link from 'next/link'
import BackButton from '../../components/BackButton'

async function getCenters(query?: string) {
  const url = query ? `http://localhost:3000/api/centers?q=${encodeURIComponent(query)}` : 'http://localhost:3000/api/centers'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export default async function CentersPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q
  const centers = await getCenters(q)

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <BackButton />
          <h1 className="fs-4 brand">Centros de Atención</h1>
          <p className="text-muted">Encuentra el centro más cercano y sus horarios.</p>

          <form method="get" className="d-flex gap-2 mt-3">
            <input name="q" defaultValue={q || ''} placeholder="Buscar por ciudad o dirección" className="form-control me-2" />
            <button className="btn btn-success">Buscar</button>
          </form>

          <div className="list-group mt-4">
            {centers.length === 0 ? (
              <div className="list-group-item">No se encontraron centros.</div>
            ) : (
              centers.map((c: any) => (
                <div key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{c.name}</h5>
                    <p className="mb-1 text-muted">{c.address}</p>
                    <small className="text-muted">{c.hours} • {c.phone}</small>
                  </div>
                  <div>
                    <a className="btn btn-outline-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`} target="_blank" rel="noreferrer">Ver mapa</a>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4"><Link href="/" className="text-muted">Volver al inicio</Link></div>
        </div>
      </div>
    </div>
  )
}
