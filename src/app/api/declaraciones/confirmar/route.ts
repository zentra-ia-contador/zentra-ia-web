import { NextRequest, NextResponse } from 'next/server'
import { railwayFetch } from '@/lib/railway'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, datosRevisados } = body
    const resultado = await railwayFetch('/api/confirmar-declaracion', { sessionId, datosRevisados })
    return NextResponse.json(resultado)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
