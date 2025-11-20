import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'users.json')

export const revalidate = 0

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { meter } = body

    if (!meter) {
      return NextResponse.json({ error: 'Medidor requerido' }, { status: 400 })
    }

    const raw = fs.readFileSync(dataPath, 'utf-8')
    const users = JSON.parse(raw)
    const idx = users.findIndex((u: any) => u.meter === meter && u.role !== 'admin')

    if (idx === -1) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Update service status to disconnected
    users[idx].serviceStatus = 'disconnected'

    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))

    const response = NextResponse.json({
      success: true,
      message: 'Servicio desconectado',
      user: users[idx]
    })

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    return response
  } catch (e) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
