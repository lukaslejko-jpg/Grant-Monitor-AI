import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Neautorizované spustenie cronu." }, { status: 401 });
  }
  return NextResponse.json({ ok: true, mode: "scheduled-monitoring", message: "Cron endpoint je pripravený pre Playwright worker a discovery monitoring nových grantových stránok." });
}
