import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'users.json')

export async function GET(request: Request, { params }: { params: { meter: string } }) {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const users = JSON.parse(raw)
  const meter = params.meter
  const user = users.find((u: any) => u.meter === meter)
  if (!user) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(user)
}
