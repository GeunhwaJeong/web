import { NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

const rpcUrl = process.env.NEXT_PUBLIC_HANEUL_RPC_URL ?? 'http://158.69.54.239:9000';

// The reference gas price only changes at epoch boundaries, so a short
// server-side cache is enough to keep the nav widget off the RPC's back.
export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'haneulx_getReferenceGasPrice',
        params: [],
      }),
      next: { revalidate: 60 },
    });

    const json = (await res.json()) as { result?: string };
    if (!json.result) {
      return NextResponse.json({ error: 'no result' }, { status: 502 });
    }

    return NextResponse.json({ gasPrice: json.result });
  } catch (error) {
    logger.error('Failed to fetch reference gas price', error);
    return NextResponse.json({ error: 'rpc unreachable' }, { status: 502 });
  }
}
