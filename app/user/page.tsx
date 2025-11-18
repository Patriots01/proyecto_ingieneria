import Link from 'next/link'
import BackButton from '../../components/BackButton'

export default function UserEntry() {
  return (
    <div className="max-w-xl">
      <BackButton />
      <h1 className="text-2xl font-bold mb-2">Acceso Usuario</h1>
      <p className="muted">Introduce tu número de medidor para ver tu información</p>
      <form action="/meter" method="get" className="mt-4 flex gap-2">
        <input name="meter" placeholder="Número de medidor" className="border px-3 py-2 rounded flex-1" />
        <button className="btn btn-primary">Ver</button>
      </form>
      <div className="mt-6">
        <Link href="/" className="text-sm muted">Volver al inicio</Link>
      </div>
    </div>
  )
}
