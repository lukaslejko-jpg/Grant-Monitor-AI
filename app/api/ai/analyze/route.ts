import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const content = String(body.content ?? "");
  if (content.length < 50) return NextResponse.json({ error: "Obsah je príliš krátky na analýzu." }, { status: 400 });
  return NextResponse.json({ ok: true, analysis: { kind: "NEW_CALL", summarySk: "AI analýza je pripravená na napojenie cez OPENAI_API_KEY.", duplicateRisk: 0 } });
}
