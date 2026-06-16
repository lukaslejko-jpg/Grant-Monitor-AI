"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Bell, Bot, Building2, FileClock, History, LayoutDashboard, Link2, Play, Search, Settings, ShieldCheck, Users } from "lucide-react";

const sources = [
  ["Ministerstvo hospodárstva SR", "MH SR", "https://www.mhsr.sk", "Ministerstvo", "6 h", "Discovery + HTML"],
  ["Eurofondy / Program Slovensko", "MIRRI SR", "https://www.eurofondy.gov.sk", "Eurofondy", "3 h", "Discovery + PDF"],
  ["Environmentálny fond", "Envirofond", "https://www.envirofond.sk", "Štátna organizácia", "12 h", "Discovery + Playwright"],
  ["Pôdohospodárska platobná agentúra", "PPA", "https://www.apa.sk", "Agrosektor", "6 h", "Discovery + dokumenty"],
  ["SIEA", "SIEA", "https://www.siea.sk", "Energetika a inovácie", "6 h", "HTML + PDF"],
  ["Plán obnovy SR", "Úrad vlády SR", "https://www.planobnovy.sk", "Plán obnovy", "4 h", "Discovery + HTML"],
  ["VAIA", "VAIA", "https://www.vaia.gov.sk", "Veda a výskum", "8 h", "HTML + dokumenty"],
  ["Erasmus+ Slovensko", "Národná agentúra", "https://www.erasmusplus.sk", "Vzdelávanie", "12 h", "Discovery + kalendár"],
  ["Fond na podporu umenia", "FPU", "https://www.fpu.sk", "Kultúra", "12 h", "Discovery + systém"],
  ["egrant", "egrant.sk", "https://www.egrant.sk", "Agregátor", "12 h", "Discovery + agregácia"],
  ["EU Funding & Tenders Portal", "Európska komisia", "https://ec.europa.eu/info/funding-tenders", "EÚ programy", "6 h", "Discovery + API"],
  ["ITMS21+", "MIRRI SR", "https://www.itms21.sk", "Technická infraštruktúra", "24 h", "Systémový portál"]
];

const grants = [
  { id: "PSK-MH-2026-41", title: "Podpora energetickej efektívnosti podnikov", issuer: "MH SR", program: "Program Slovensko", status: "Otvorená", deadline: "30.07.2026", allocation: "42 000 000 EUR", support: "50 000 - 2 000 000 EUR", matchClient: "GreenTech Solutions s.r.o.", match: 86, source: "Eurofondy / Program Slovensko" },
  { id: "MIRRI-DIGI-2026-08", title: "Digitalizácia služieb obcí a miest", issuer: "MIRRI SR", program: "Plán obnovy", status: "Zmenená", deadline: "12.07.2026", allocation: "18 000 000 EUR", support: "20 000 - 750 000 EUR", matchClient: "Mesto Liptovský Hrádok", match: 94, source: "Plán obnovy SR" }
];

const roles = {
  Admin: "Plný prístup ku zdrojom, AI, používateľom a audit logu",
  Pracovník: "Správa výziev, klientov, párovania a notifikácií",
  Klient: "Vlastné výzvy, zhody, prílohy a notifikácie"
};

const nav = [
  ["dashboard", "Dashboard", LayoutDashboard], ["sources", "Zdroje", Link2], ["grants", "Výzvy", FileClock], ["history", "História", History], ["ai", "AI analýza", Bot], ["clients", "Klienti", Building2], ["matching", "Párovanie", Users], ["notifications", "Notifikácie", Bell], ["admin", "Admin", Settings]
] as const;

type Role = keyof typeof roles;
type Session = { name: string; email: string; role: Role; status?: string };

type Grant = typeof grants[number];

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [active, setActive] = useState("dashboard");
  const [grantId, setGrantId] = useState(grants[0].id);
  const grant = useMemo(() => grants.find((item) => item.id === grantId) ?? grants[0], [grantId]);
  const title = nav.find(([id]) => id === active)?.[1] ?? "Dashboard";

  if (!session) return <AuthScreen onEnter={(next) => setSession(next)} />;

  return <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-lg bg-[#18365f] text-white"><ShieldCheck /></div><div><h1 className="m-0 text-2xl font-semibold">Grant Monitor AI</h1><p className="m-0 text-sm text-slate-500">Bezpečné monitorovanie výziev, klientov a notifikácií</p></div></div>
      <div className="flex flex-wrap items-center gap-2"><Badge tone={session.status ? "amber" : "green"}>{session.role}</Badge><span className="text-sm text-slate-600">{session.name}</span><button onClick={() => setSession(null)} className="min-h-10 rounded-md border px-3 text-sm font-semibold">Odhlásiť</button><button className="min-h-11 rounded-md bg-[#2f7a58] px-4 font-semibold text-white"><Play className="mr-2 inline h-4 w-4" />Spustiť kontrolu</button></div>
    </div></header>
    <div className="mx-auto grid max-w-[1480px] lg:grid-cols-[280px_1fr]">
      <aside className="border-r bg-slate-50 p-5"><div className="mb-4 rounded-lg border bg-white p-4"><p className="text-xs font-bold uppercase text-[#2f7a58]">Aktívny prístup</p><b>{session.role}</b><p className="text-sm text-slate-500">{session.status ?? roles[session.role]}</p></div><nav className="grid gap-2">{nav.filter(([id]) => session.role === "Klient" ? !["sources", "admin"].includes(id) : true).map(([id, label, Icon]) => <button key={id} onClick={() => setActive(id)} className={`flex min-h-11 items-center gap-2 rounded-md px-3 text-left text-sm font-semibold ${active === id ? "bg-[#18365f] text-white" : "text-slate-700 hover:bg-white"}`}><Icon className="h-4 w-4" />{label}</button>)}</nav></aside>
      <section className="p-5"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold text-[#2f7a58]">Pracovný modul</p><h2 className="m-0 text-3xl font-semibold">{title}</h2></div><div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><input className="min-h-11 rounded-md border px-9" placeholder="Hľadať zdroj, výzvu, klienta..." /></div></div>
        <LinkedGrant grant={grant} setActive={setActive} />
        {active === "dashboard" && <Dashboard />}
        {active === "sources" && <Sources />}
        {active === "grants" && <Grants grantId={grantId} setGrantId={setGrantId} setActive={setActive} />}
        {active === "history" && <HistoryPanel grant={grant} />}
        {active === "ai" && <AiPanel grant={grant} />}
        {active === "clients" && <Clients />}
        {active === "matching" && <Matching grant={grant} />}
        {active === "notifications" && <Notifications grant={grant} />}
        {active === "admin" && <Admin />}
      </section>
    </div>
  </main>;
}

function AuthScreen({ onEnter }: { onEnter: (session: Session) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<Role>("Admin");
  return <main className="grid min-h-screen place-items-center bg-slate-100 p-6 text-slate-900"><section className="grid w-full max-w-5xl overflow-hidden rounded-xl border bg-white shadow-2xl lg:grid-cols-[.95fr_1.05fr]"><div className="bg-[#18365f] p-8 text-white"><div className="grid h-12 w-12 place-items-center rounded-lg bg-white/15"><ShieldCheck /></div><h1 className="mt-5 text-4xl font-semibold">Grant Monitor AI</h1><p className="mt-3 text-slate-100">Vstupná brána pre admina, pracovníkov a klientov. Nový klient sa registruje cez firemný profil a čaká na schválenie.</p><div className="mt-6 grid gap-3 text-sm text-slate-100"><p>• Role-based access control</p><p>• Audit log a bezpečné API kľúče</p><p>• Schvaľovanie klientov pred aktiváciou</p><p>• Oddelené admin a používateľské rozhranie</p></div></div><div className="p-8"><div className="mb-5 flex gap-2"><button onClick={() => setMode("login")} className={`min-h-11 rounded-md border px-4 font-semibold ${mode === "login" ? "bg-[#18365f] text-white" : "bg-white"}`}>Prihlásenie</button><button onClick={() => setMode("register")} className={`min-h-11 rounded-md border px-4 font-semibold ${mode === "register" ? "bg-[#18365f] text-white" : "bg-white"}`}>Registrácia klienta</button></div>{mode === "login" ? <div className="grid gap-3"><Field label="E-mail" defaultValue="admin@grantmonitor.sk" /><Field label="Heslo" type="password" defaultValue="demo-demo" /><label className="grid gap-1 text-sm font-semibold text-slate-600">Rola<select value={role} onChange={(event) => setRole(event.target.value as Role)} className="min-h-11 rounded-md border px-3 text-slate-900"><option>Admin</option><option>Pracovník</option><option>Klient</option></select></label><button onClick={() => onEnter({ name: role === "Klient" ? "Klient Demo" : "Lukáš Lejko", email: "admin@grantmonitor.sk", role })} className="min-h-11 rounded-md bg-[#2f7a58] px-4 font-semibold text-white">Prihlásiť sa</button><p className="text-sm text-slate-500">Demo prihlasovanie. Produkčne sa napojí Auth.js, hashované heslá, reset hesla a 2FA pre admina.</p></div> : <div className="grid gap-3"><div className="grid gap-3 md:grid-cols-2"><Field label="Názov firmy" defaultValue="GreenTech Solutions s.r.o." /><Field label="IČO" defaultValue="54881230" /></div><div className="grid gap-3 md:grid-cols-2"><Field label="E-mail kontaktnej osoby" defaultValue="kontakt@firma.sk" /><Field label="Región" defaultValue="Trenčiansky kraj" /></div><div className="grid gap-3 md:grid-cols-2"><Field label="SK NACE" defaultValue="62.01" /><Field label="Záujmové oblasti" defaultValue="Energetika, digitalizácia" /></div><button onClick={() => onEnter({ name: "Nový klient", email: "kontakt@firma.sk", role: "Klient", status: "Registrácia prijatá, čaká na schválenie adminom." })} className="min-h-11 rounded-md bg-[#2f7a58] px-4 font-semibold text-white">Odoslať registráciu</button><p className="text-sm text-slate-500">Registrácia vytvorí klienta v stave čaká na schválenie. Admin priradí pracovníka, aktivuje notifikácie a nastaví prístup.</p></div>}</div></section></main>;
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) { return <label className="grid gap-1 text-sm font-semibold text-slate-600">{label}<input {...props} className="min-h-11 rounded-md border px-3 text-slate-900" /></label>; }
function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>; }
function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "blue" | "amber" | "red" }) { const c = { green: "bg-green-50 text-green-800", blue: "bg-blue-50 text-blue-800", amber: "bg-amber-50 text-amber-800", red: "bg-red-50 text-red-800" }[tone]; return <span className={`inline-flex min-h-7 items-center rounded-md px-2 text-xs font-bold ${c}`}>{children}</span>; }
function LinkedGrant({ grant, setActive }: { grant: Grant; setActive: (id: string) => void }) { return <Card className="mb-5 border-[#b8d8c8] bg-[#f7fbf9] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase text-[#2f7a58]">Prepojený záznam výzvy</p><h3 className="m-0 text-base font-semibold">{grant.title}</h3><p className="m-0 text-sm text-slate-600">{grant.id} · {grant.issuer} · uzávierka {grant.deadline}</p></div><div className="flex flex-wrap gap-2">{[["grants","Detail"],["history","Zmeny"],["ai","AI"],["matching","Zhody"],["notifications","Notifikácie"]].map(([id,label]) => <button key={id} onClick={() => setActive(id)} className="min-h-9 rounded-md border bg-white px-3 text-sm font-semibold">{label}</button>)}</div></div></Card>; }
function Dashboard() { return <div className="grid gap-4 xl:grid-cols-4">{[["Sledované zdroje","34","31 aktívnych + discovery"],["Nové výzvy","24","za 7 dní"],["Zmenené výzvy","17","termíny a sumy"],["Nefunkčné zdroje","3","vyžadujú kontrolu"]].map(([a,b,c]) => <Card key={a} className="p-5"><p className="text-sm text-slate-500">{a}</p><p className="my-2 text-4xl font-bold">{b}</p><Badge tone="blue">{c}</Badge></Card>)}</div>; }
function Sources() { return <div className="space-y-5"><Card className="p-5"><h3>Discovery monitoring nových výziev</h3><p className="text-slate-600">Aplikácia neustále monitoruje hlavné portály, nové podstránky a PDF dokumenty. Nové URL prejdú SSRF validáciou, robots.txt kontrolou a čakárňou na potvrdenie.</p></Card><Card className="overflow-auto p-5"><h3>Sledované zdroje</h3><table className="mt-4 w-full text-sm"><tbody>{sources.map(([name, org, url, category, interval, type]) => <tr key={String(url)} className="border-t"><td className="py-3"><b>{name}</b><div className="text-xs text-slate-500">{url}</div></td><td>{org}</td><td>{category}</td><td>{interval}</td><td>{type}</td><td><Badge>Aktívny</Badge></td></tr>)}</tbody></table></Card></div>; }
function Grants({ grantId, setGrantId, setActive }: { grantId: string; setGrantId: (id: string) => void; setActive: (id: string) => void }) { return <div className="grid gap-4">{grants.map((grant) => <Card key={grant.id} className={`p-5 ${grant.id === grantId ? "border-[#2f7a58] shadow-lg" : ""}`}><div className="flex justify-between gap-3"><div><h3>{grant.title}</h3><p className="text-sm text-slate-500">{grant.id} · {grant.issuer} · {grant.program}</p></div><Badge tone={grant.status === "Zmenená" ? "amber" : "green"}>{grant.status}</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-3"><Info k="Uzávierka" v={grant.deadline} /><Info k="Alokácia" v={grant.allocation} /><Info k="Podpora" v={grant.support} /></div><div className="mt-4 flex gap-2"><button onClick={() => setGrantId(grant.id)} className="min-h-10 rounded-md bg-[#2f7a58] px-3 text-white">Aktívna výzva</button><button onClick={() => { setGrantId(grant.id); setActive("history"); }} className="min-h-10 rounded-md border px-3">História</button><button onClick={() => { setGrantId(grant.id); setActive("matching"); }} className="min-h-10 rounded-md border px-3">Párovanie</button></div></Card>)}</div>; }
function Info({ k, v }: { k: string; v: string }) { return <div className="rounded-md border bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{k}</p><b>{v}</b></div>; }
function HistoryPanel({ grant }: { grant: Grant }) { return <Card className="p-5"><h3>História zmien</h3><p className="text-slate-500">Zmeny pre {grant.id}: {grant.title}</p><Info k="Dátum uzávierky" v={grant.deadline} /><Info k="Pôvodný zdroj" v={grant.source} /></Card>; }
function AiPanel({ grant }: { grant: Grant }) { return <Card className="p-5"><h3>AI analýza</h3><p className="text-slate-600">AI výstup je naviazaný na rovnaký GrantCall záznam ako história, párovanie a notifikácie.</p><pre className="overflow-auto rounded-lg bg-[#10213a] p-4 text-white">{JSON.stringify({ grantNumber: grant.id, title: grant.title, deadlineAt: grant.deadline, source: grant.source, duplicateRisk: 12 }, null, 2)}</pre></Card>; }
function Clients() { return <Card className="p-5"><h3>Klienti</h3><p>GreenTech Solutions s.r.o. · Mesto Liptovský Hrádok · firemné profily, de minimis, SK NACE a záujmové oblasti.</p></Card>; }
function Matching({ grant }: { grant: Grant }) { return <Card className="p-5"><div className="flex justify-between"><div><h3>{grant.matchClient}</h3><p className="text-slate-500">{grant.title}</p></div><div className="grid h-16 w-16 place-items-center rounded-lg bg-green-50 text-xl font-bold text-green-800">{grant.match}%</div></div><p className="mt-4">Výsledok musí manuálne potvrdiť pracovník.</p></Card>; }
function Notifications({ grant }: { grant: Grant }) { return <div className="grid gap-4 md:grid-cols-3">{["Okamžité upozornenia", "Denný súhrn", "Týždenný súhrn"].map((item) => <Card key={item} className="p-5"><h3>{item}</h3><p className="text-slate-600">Filter: {grant.id}</p><Badge tone="blue">Naplánované</Badge></Card>)}</div>; }
function Admin() { return <div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><h3>Správa používateľov</h3><p>Pozvánky, schvaľovanie klientov, RBAC a reset hesla.</p></Card><Card className="p-5"><h3>Nastavenie AI</h3><p>Modely, limity, prompt šablóny.</p></Card><Card className="p-5"><h3>Log kontrol a chýb</h3><p>Audit log, worker logy a monitoring.</p></Card></div>; }
