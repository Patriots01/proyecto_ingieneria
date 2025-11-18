import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'centers.json')

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || url.searchParams.get('query') || ''
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const centers = JSON.parse(raw)
  if (!q) return NextResponse.json(centers)
  const lower = q.toLowerCase()
  const filtered = centers.filter((c: any) =>
    c.name.toLowerCase().includes(lower) || c.address.toLowerCase().includes(lower)
  )
  return NextResponse.json(filtered)
}
