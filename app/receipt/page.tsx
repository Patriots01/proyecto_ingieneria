import React from 'react'
import ReceiptPrintButton from '../../components/ReceiptPrintButton'
import fs from 'fs'
import path from 'path'

export const revalidate = 0 // Disable caching for this page

// Funcion para obtener a los usaurios
async function getUser(meter: string) {
    const dataPath = path.join(process.cwd(), 'data', 'users.json')
    try {
        const raw = fs.readFileSync(dataPath, 'utf-8')
        const users = JSON.parse(raw)
        return users.find((u: any) => u.meter === meter) || null
    } catch (e) {
        return null
    }
}

export default async function ReceiptPage({ searchParams }: { searchParams?: { meter?: string; quarter?: string } }) {
    const meter = searchParams?.meter
    const quarter = searchParams?.quarter
    if (!meter) {
        return <div className="p-4">Medidor no proporcionado</div>
    }

    const user = await getUser(meter)
    if (!user) return <div className="p-4">Medidor no encontrado</div>

    const payment = (user.payments || []).find((p: any) => p.quarter === quarter) || null

    return (
        <div className="p-6">
        <div className="card" id="receipt-to-print">
            <div className="d-flex justify-content-between mb-3">
            <div className="d-flex align-items-center gap-3">
                <img src="/cfe_icon.jpeg" alt="CFE" style={{width:72,height:72,objectFit: 'cover', borderRadius:8}} />
                <div>
                <div className="font-semibold">CFE - Suministrador de Servicios Básicos</div>
                <div className="text-sm muted">Recibo trimestral</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm muted">Cuenta / Medidor</div>
                <div className="font-semibold">{user.meter}</div>
            </div>
            </div>

            <div className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between">
                <div>
                <div className="text-sm muted">Cliente</div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm muted">{user.address}</div>
                </div>
                <div className="text-right">
                <div className="text-sm muted">Total a pagar</div>
                <div className="text-xl font-bold">${payment ? Number(payment.amount).toFixed(2) : Number(0).toFixed(2)}</div>
                </div>
            </div>
            </div>

            <h3 className="font-semibold mb-2">Detalle</h3>
            <table className="w-100" style={{borderCollapse: 'collapse'}}>
            <thead>
                <tr>
                <th className="text-left">Trimestre</th>
                <th className="text-right">Importe</th>
                <th className="text-right">Estado</th>
                </tr>
            </thead>
            <tbody>
                {(user.payments || []).map((p: any) => (
                <tr key={p.quarter}>
                    <td>{p.quarter}</td>
                    <td className="text-right">${Number(p.amount).toFixed(2)}</td>
                    <td className="text-right">{p.status === 'paid' ? 'Pagado' : p.status === 'pending' ? 'Pendiente' : 'Vencido'}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div className="mt-4">
            <ReceiptPrintButton />
        </div>
        </div>
    )
}
