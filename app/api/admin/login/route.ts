import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'users.json')

export const revalidate = 0

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 })
    }

    const raw = fs.readFileSync(dataPath, 'utf-8')
    const users = JSON.parse(raw)

    // Find admin user by username and password
    const admin = users.find((u: any) => 
      u.role === 'admin' && 
      u.username === username && 
      u.password === password
    )

    if (!admin) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrecto' }, { status: 401 })
    }

    // Return admin info (password should NOT be returned)
    const response = NextResponse.json({
      username: admin.username,
      name: admin.name,
      employeeId: admin.employeeId,
      adminType: admin.adminType,
      assignedCenter: admin.assignedCenter,
      permissions: admin.permissions,
    })

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    return response
  } catch (e) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
