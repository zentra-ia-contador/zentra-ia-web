import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // Validar que viene de Payphone (implementar validación de firma aquí)
    const { transactionId, statusCode, clientTransactionId } = body
    
    if (statusCode === 3) {
      // Pago exitoso
      await supabase.from('subscriptions')
        .update({ status: 'active', payphone_transaction_id: transactionId })
        .eq('id', clientTransactionId)
      
      await supabase.from('payments')
        .update({ status: 'paid', payphone_id: transactionId })
        .eq('subscription_id', clientTransactionId)
    } else {
      // Pago fallido
      await supabase.from('subscriptions')
        .update({ status: 'past_due' })
        .eq('id', clientTransactionId)
      
      await supabase.from('payments')
        .update({ status: 'failed' })
        .eq('subscription_id', clientTransactionId)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
