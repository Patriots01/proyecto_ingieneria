import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'users.json')

export const revalidate = 0 // Disable caching for this route

export async function GET(request: Request, { params }: { params: { meter: string } }) {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const users = JSON.parse(raw)
  const meter = params.meter
  const user = users.find((u: any) => u.meter === meter)
  if (!user) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  const response = NextResponse.json(user)
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  return response
}
