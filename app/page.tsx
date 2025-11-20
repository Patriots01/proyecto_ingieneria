import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="hero">
        <div className="hero-inner container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="hero-title display-5">Proyecto de la Comision Federal de<br/>Electricidad</h1>
              <p className="text-white-50 mt-3">Consulta tu recibo, reporta irregularidades y gestiona pagos de manera rápida y segura.</p>
              <div className="mt-4">
                <Link href="/user" className="btn btn-success me-2">Consulta aquí</Link>
                <Link href="/meter?meter=10001" className="btn btn-outline-light">Ver ejemplo</Link>
              </div>
            </div>
            <div className="col-md-4 mt-4 mt-md-0">
              <div className="bg-white rounded p-3 shadow-sm">
                <h5 className="mb-2">Consulta rápida</h5>
                <form action="/meter" method="get">
                  <input name="meter" placeholder="Número de medidor" className="form-control mb-2" />
                  <button className="btn btn-success w-100">Buscar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="services-grid">
          <div className="service-card service-card--highlight">
            <div className="service-icon">📄</div>
            <div className="service-title">Mi CFE</div>
            <div className="service-desc text-white">Consulta, descarga y paga tu recibo</div>
            <div className="mt-3"><a href="/user" className="btn btn-success">Ir a Mi CFE</a></div>
          </div>

          <div className="service-card service-card--highlight">
            <div className="service-icon">📍</div>
            <div className="service-title text-white">Centros de atención</div>
            <div className="service-desc text-white">Ubica el centro más cercano</div>
            <div className="mt-3"><a href="/centers" className="btn btn-success mt-3">Ver centros</a></div>
          </div>

          <div className="service-card service-card--highlight">
            <div className="service-icon">⚠️</div>
            <div className="service-title text-white">Reportes</div>
            <div className="service-desc text-white">Notifica irregularidades en tu suministro</div>
            <div className="mt-3"><a href="/report" className="btn btn-success">Reportar</a></div>
          </div>

          <div className="service-card service-card--highlight">
            <div className="service-icon">🔐</div>
            <div className="service-title text-white">Panel Administrativo</div>
            <div className="service-desc text-white">Acceso de administradores</div>
            <div className="mt-3"><a href="/admin/login" className="btn btn-primary">Ingresar</a></div>
          </div>

          <div className="service-card service-card--highlight">
            <div className="service-icon">🧮</div>
            <div className="service-title text-white">Ejemplo de cálculo</div>
            <div className="service-desc text-white">Aprende cómo se calcula tu consumo de luz</div>
            <div className="mt-3"><a href="/payment-example" className="btn btn-success">Ver ejemplo</a></div>
          </div>
        </div>
      </section>

      {/* Floating actions */}
      <div className="floating-actions">
        <a href="#" className="fab">PAGA TU RECIBO</a>
        <a href="tel:071" className="fab fab-outline">LLAMA AL 071</a>
      </div>
    </div>
  )
}
