import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="mb-4">
      <div className="header-top" />
      <div className="d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{width:50,height:50,position:'relative'}}>
            <Image 
              src="/cfe_icon.jpeg" 
              alt="CFE Logo" 
              width={40} 
              height={40}
              className="rounded-circle"
              style={{objectFit: 'cover'}}
            />
          </div>
          <div>
            <Link href="/" className="brand fs-4">CFE Portal</Link>
            <div className="text-muted small">Consulta y gestiona tus recibos</div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <nav className="d-none d-md-block">
            <Link href="/user" className="me-3 text-cfe-dark">Usuario</Link>
            <Link href="/admin" className="text-cfe-dark">Administrador</Link>
          </nav>

          <Link href="/user" className="btn btn-success d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M8 9a5 5 0 0 0-5 5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14a5 5 0 0 0-5-5z"/>
            </svg>
            <span className="ms-2">MI CFE</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
