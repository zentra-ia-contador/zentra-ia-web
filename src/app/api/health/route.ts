import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { error } = await supabase.from('plan_config').select('count').limit(1)
    if (error) throw error
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString(), supabase: 'connected' })
  } catch (error) {
    return NextResponse.json({ status: 'error', timestamp: new Date().toISOString(), supabase: 'disconnected' }, { status: 500 })
  }
}
