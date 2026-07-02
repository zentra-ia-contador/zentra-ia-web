import { NextRequest, NextResponse } from 'next/server'
import { railwayFetch } from '@/lib/railway'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, captchaSolucion } = body
    const resultado = await railwayFetch('/api/resolver-captcha', { sessionId, captchaSolucion })
    return NextResponse.json(resultado)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
