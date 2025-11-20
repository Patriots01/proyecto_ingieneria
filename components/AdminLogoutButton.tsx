'use client'
import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('adminSession')
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
    >
      Cerrar Sesión
    </button>
  )
}
