import Link from 'next/link'
import BackButton from '../../components/BackButton'

export default function AdminEntry() {
  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <BackButton />
        <h1 className="text-2xl font-bold mb-1 brand">Acceso Administrador</h1>
        <p className="muted mb-4">Introduce tu número de trabajador para acceder al panel</p>

        <form action="/admin/dashboard" method="get" className="mt-2">
          <input name="worker" placeholder="Número de trabajador" className="border px-3 py-2 rounded w-full mb-3" />
          <div className="flex gap-2">
            <button className="btn-cfe">Entrar</button>
            <Link href="/" className="btn-cfe-outline inline-flex items-center justify-center">Volver</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
