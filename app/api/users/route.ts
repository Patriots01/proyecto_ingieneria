import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'users.json')

export const revalidate = 0 // Disable caching for this route

export async function GET() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const users = JSON.parse(raw)
  const response = NextResponse.json(users)
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  return response
}

export async function PUT(request: Request) {
  const body = await request.json()
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const users = JSON.parse(raw)
  const idx = users.findIndex((u: any) => u.meter === body.meter)
  if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  users[idx] = { ...users[idx], ...body }
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
  return NextResponse.json(users[idx])
}

// Accept form submissions from admin edit form
export async function POST(request: Request) {
  const url = new URL(request.url)
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const users = JSON.parse(raw)

  // Parse form-encoded body if needed
  const contentType = request.headers.get('content-type') || ''
  let body: any
  if (contentType.includes('application/json')) {
    body = await request.json()
  } else {
    const text = await request.text()
    const params = new URLSearchParams(text)
    body = Object.fromEntries(params.entries())
  }

  // support _method=put for form override
  const methodOverride = (body._method || url.searchParams.get('_method') || '').toLowerCase()
  if (methodOverride === 'put') {
    const idx = users.findIndex((u: any) => u.meter === body.meter)
    if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    // convert numeric fields
    if (body.balance) body.balance = Number(body.balance)
    users[idx] = { ...users[idx], ...body }
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
    return NextResponse.json(users[idx])
  }

  return NextResponse.json({ error: 'Método no soportado' }, { status: 400 })
}
