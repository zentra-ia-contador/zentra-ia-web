import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { railwayFetch } from '@/lib/railway'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const body = await req.json()
    const { ruc, username, password, periodo, empresaId, tipoDeclaracion } = body
    
    // Verificar autenticación
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    
    // Verificar límite de declaraciones del plan
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .single()
    
    if (!subscription) return NextResponse.json({ error: 'Sin suscripción activa' }, { status: 403 })
    
    const esExtra = subscription.declarations_used >= subscription.declarations_limit
    
    // Llamar al scraper en Railway
    const resultado = await railwayFetch('/api/declarar-iva', {
      ruc, username, password, periodo, empresaId
    })
    
    // Guardar en Supabase
    await supabase.from('declarations').insert({
      company_id: empresaId,
      period: periodo,
      type: tipoDeclaracion || 'IVA',
      declaration_type: tipoDeclaracion || 'IVA',
      status: resultado.captchaRequired ? 'processing' : 'pending',
      billed_as_extra: esExtra,
      extra_amount_charged: esExtra ? subscription.extra_declaration_price : null
    })
    
    // Actualizar contador de declaraciones usadas
    if (!esExtra) {
      await supabase.from('subscriptions')
        .update({ declarations_used: subscription.declarations_used + 1 })
        .eq('id', subscription.id)
    }
    
    return NextResponse.json(resultado)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
