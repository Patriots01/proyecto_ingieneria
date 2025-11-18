import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'reports.json')

export async function GET() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const reports = JSON.parse(raw)
  return NextResponse.json(reports)
}

export async function POST(request: Request) {
  let body: any
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    body = await request.json()
  } else {
    // handle form submissions (application/x-www-form-urlencoded)
    const text = await request.text()
    const params = new URLSearchParams(text)
    body = Object.fromEntries(params.entries())
  }
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const reports = JSON.parse(raw)
  const id = reports.length ? Math.max(...reports.map((r: any) => r.id)) + 1 : 1
  const newReport = { id, ...body }
  reports.push(newReport)
  fs.writeFileSync(dataPath, JSON.stringify(reports, null, 2))
  return NextResponse.json(newReport)
}
