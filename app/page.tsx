"use client";

import { useMemo, useState } from "react";
import { Bell, Bot, Building2, FileClock, History, LayoutDashboard, Link2, Play, Search, Settings, ShieldCheck, Users } from "lucide-react";

const sources = [
  ["Ministerstvo hospodárstva SR", "MH SR", "https://www.mhsr.sk", "Ministerstvo", "6 h", "Discovery + HTML"],
  ["Eurofondy / Program Slovensko", "MIRRI SR", "https://www.eurofondy.gov.sk", "Eurofondy", "3 h", "Discovery + PDF"],
  ["Environmentálny fond", "Envirofond", "https://www.envirofond.sk", "Štátna organizácia", "12 h", "Discovery + Playwright"],
  ["Pôdohospodárska platobná agentúra", "PPA", "https://www.apa.sk", "Agrosektor", "6 h", "Discovery + dokumenty"],
  ["SIEA", "SIEA", "https://www.siea.sk", "Energetika a inovácie", "6 h", "HTML + PDF"],
  ["Inovujme", "SIEA", "https://www.inovujme.sk", "Podpora podnikania", "6 h", "Discovery"],
  ["Plán obnovy SR", "Úrad vlády SR", "https://www.planobnovy.sk", "Plán obnovy", "4 h", "Discovery + HTML"],
  ["VAIA", "VAIA", "https://www.vaia.gov.sk", "Veda a výskum", "8 h", "HTML + dokumenty"],
  ["Erasmus+ Slovensko", "Národná agentúra", "https://www.erasmusplus.sk", "Vzdelávanie", "12 h", "Discovery + kalendár"],
  ["Fond na podporu umenia", "FPU", "https://www.fpu.sk", "Kultúra", "12 h", "Discovery + systém"],
  ["egrant", "egrant.sk", "https://www.egrant.sk", "Agregátor", "12 h", "Discovery + agregácia"],
  ["EU Funding & Tenders Portal", "Európska komisia", "https://ec.europa.eu/info/funding-tenders", "EÚ programy", "6 h", "Discovery + API"],
  ["Program LIFE", "Európska komisia", "https://cinea.ec.europa.eu/programmes/life_en", "Životné prostredie", "12 h", "Discovery"],
  ["ITMS2014+", "DataCentrum", "https://www.itms2014.sk", "Technická infraštruktúra", "24 h", "Systémový portál"],
  ["ITMS21+", "MIRRI SR", "https://www.itms21.sk", "Technická infraštruktúra", "24 h", "Systémový portál"]
];

const grants = [
  { id: "PSK-MH-2026-41", title: "Podpora energetickej efektívnosti podnikov", issuer: "MH SR", program: "Program Slovensko", status: "Otvorená", deadline: "30.07.2026", allocation: "42 000 000 EUR", support: "50 000 - 2 000 000 EUR", matchClient: "GreenTech Solutions s.r.o.", match: 86, source: "Eurofondy / Program Slovensko" },
  { id: "MIRRI-DIGI-2026-08", title: "Digitalizácia služieb obcí a miest", issuer: "MIRRI SR", program: "Plán obnovy", status: "Zmenená", deadline: "12.07.2026", allocation: "18 000 000 EUR", support: "20 000 - 750 000 EUR", matchClient: "Mesto Liptovský Hrádok", match: 94, source: "Plán obnovy SR" }
];

const nav = [
  ["dashboard", "Dashboard", LayoutDashboard], ["sources", "Zdroje", Link2], ["grants", "Výzvy", FileClock], ["history", "História", History], ["ai", "AI analýza", Bot], ["clients", "Klienti", Building2], ["matching", "Párovanie", Users], ["notifications", "Notifikácie", Bell], ["admin", "Admin", Settings]
] as const;

const roles = {
  Admin: "Plný prístup ku zdrojom, AI, používateľom a audit logu",
  Pracovník: "Správa výziev, klientov, párovania a notifikácií",
  Klient: "Vlastné výzvy, zhody, prílohy a notifikácie"
};

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const [role, setRole] = useState<keyof typeof roles>("Admin");
  const [grantId, setGrantId] = useState(grants[0].id);
  const grant = useMemo(() => grants.find((item) => item.id === grantId) ?? grants[0], [grantId]);
  const title = nav.find(([id]) => id === active)?.[1] ?? "Dashboard";

  return <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-lg bg-[#18365f] text-white"><ShieldCheck /></div><div><h1 className="m-0 text-2xl font-semibold">Grant Monitor AI</h1><p className="m-0 text-sm text-slate-500">Automatické sledovanie výziev, zmien a uzávierok</p></div></div>
      <div className="flex flex-wrap gap-2"><div className="flex rounded-lg border bg-slate-50 p-1">{Object.keys(roles).map((item) => <button key={item} onClick={() => setRole(item as keyof typeof roles)} className={`min-h-10 rounded-md px-3 text-sm font-medium ${role === item ? "bg-white text-[#18365f] shadow" : "text-slate-600"}`}>{item}</button>)}</div><button className="min-h-11 rounded-md bg-[#2f7a58] px-4 font-semibold text-white"><Play className="mr-2 inline h-4 w-4" />Spustiť kontrolu</button></div>
    </div></header>
    <div className="mx-auto grid max-w-[1480px] lg:grid-cols-[280px_1fr]">
      <aside className="border-r bg-slate-50 p-5"><div className="mb-4 rounded-lg border bg-white p-4"><p className="text-xs font-bold uppercase text-[#2f7a58]">Aktívna rola</p><b>{role}</b><p className="text-sm text-slate-500">{roles[role]}</p></div><nav className="grid gap-2">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setActive(id)} className={`flex min-h-11 items-center gap-2 rounded-md px-3 text-left text-sm font-semibold ${active === id ? "bg-[#18365f] text-white" : "text-slate-700 hover:bg-white"}`}><Icon className="h-4 w-4" />{label}</button>)}</nav></aside>
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

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>; }
function Badge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "blue" | "amber" | "red" }) { const c = { green: "bg-green-50 text-green-800", blue: "bg-blue-50 text-blue-800", amber: "bg-amber-50 text-amber-800", red: "bg-red-50 text-red-800" }[tone]; return <span className={`inline-flex min-h-7 items-center rounded-md px-2 text-xs font-bold ${c}`}>{children}</span>; }
function LinkedGrant({ grant, setActive }: { grant: typeof grants[number]; setActive: (id: string) => void }) { return <Card className="mb-5 border-[#b8d8c8] bg-[#f7fbf9] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase text-[#2f7a58]">Prepojený záznam výzvy</p><h3 className="m-0 text-base font-semibold">{grant.title}</h3><p className="m-0 text-sm text-slate-600">{grant.id} · {grant.issuer} · uzávierka {grant.deadline}</p></div><div className="flex flex-wrap gap-2">{[["grants","Detail"],["history","Zmeny"],["ai","AI"],["matching","Zhody"],["notifications","Notifikácie"]].map(([id,label]) => <button key={id} onClick={() => setActive(id)} className="min-h-9 rounded-md border bg-white px-3 text-sm font-semibold">{label}</button>)}</div></div></Card>; }
function Dashboard() { return <div className="grid gap-4 xl:grid-cols-4">{[["Sledované zdroje","34","31 aktívnych + discovery"],["Nové výzvy","24","za 7 dní"],["Zmenené výzvy","17","termíny a sumy"],["Nefunkčné zdroje","3","vyžadujú kontrolu"]].map(([a,b,c]) => <Card key={a} className="p-5"><p className="text-sm text-slate-500">{a}</p><p className="my-2 text-4xl font-bold">{b}</p><Badge tone="blue">{c}</Badge></Card>)}</div>; }
function Sources() { return <div className="space-y-5"><Card className="p-5"><h3>Discovery monitoring nových výziev</h3><p className="text-slate-600">Aplikácia neustále monitoruje hlavné portály, nové podstránky a PDF dokumenty. Nové URL prejdú SSRF validáciou, robots.txt kontrolou a čakárňou na potvrdenie.</p></Card><Card className="overflow-auto p-5"><h3>Sledované zdroje</h3><table className="mt-4 w-full text-sm"><thead><tr className="text-left text-xs uppercase text-slate-500"><th>Názov</th><th>Organizácia</th><th>Kategória</th><th>Interval</th><th>Typ</th><th>Stav</th></tr></thead><tbody>{sources.map(([name, org, url, category, interval, type]) => <tr key={String(url)} className="border-t"><td className="py-3"><b>{name}</b><div className="text-xs text-slate-500">{url}</div></td><td>{org}</td><td>{category}</td><td>{interval}</td><td>{type}</td><td><Badge>Aktívny</Badge></td></tr>)}</tbody></table></Card></div>; }
function Grants({ grantId, setGrantId, setActive }: { grantId: string; setGrantId: (id: string) => void; setActive: (id: string) => void }) { return <div className="grid gap-4">{grants.map((grant) => <Card key={grant.id} className={`p-5 ${grant.id === grantId ? "border-[#2f7a58] shadow-lg" : ""}`}><div className="flex justify-between gap-3"><div><h3>{grant.title}</h3><p className="text-sm text-slate-500">{grant.id} · {grant.issuer} · {grant.program}</p></div><Badge tone={grant.status === "Zmenená" ? "amber" : "green"}>{grant.status}</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-3"><Info k="Uzávierka" v={grant.deadline} /><Info k="Alokácia" v={grant.allocation} /><Info k="Podpora" v={grant.support} /></div><div className="mt-4 flex gap-2"><button onClick={() => setGrantId(grant.id)} className="min-h-10 rounded-md bg-[#2f7a58] px-3 text-white">Aktívna výzva</button><button onClick={() => { setGrantId(grant.id); setActive("history"); }} className="min-h-10 rounded-md border px-3">História</button><button onClick={() => { setGrantId(grant.id); setActive("matching"); }} className="min-h-10 rounded-md border px-3">Párovanie</button></div></Card>)}</div>; }
function Info({ k, v }: { k: string; v: string }) { return <div className="rounded-md border bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{k}</p><b>{v}</b></div>; }
function HistoryPanel({ grant }: { grant: typeof grants[number] }) { return <Card className="p-5"><h3>História zmien</h3><p className="text-slate-500">Zmeny pre {grant.id}: {grant.title}</p><div className="grid gap-3"><Info k="Dátum uzávierky" v={grant.deadline} /><Info k="Alokácia" v={grant.allocation} /><Info k="Pôvodný zdroj" v={grant.source} /></div></Card>; }
function AiPanel({ grant }: { grant: typeof grants[number] }) { return <Card className="p-5"><h3>AI analýza</h3><p className="text-slate-600">AI výstup je naviazaný na rovnaký GrantCall záznam ako história, párovanie a notifikácie.</p><pre className="overflow-auto rounded-lg bg-[#10213a] p-4 text-white">{JSON.stringify({ grantNumber: grant.id, title: grant.title, deadlineAt: grant.deadline, source: grant.source, duplicateRisk: 12 }, null, 2)}</pre></Card>; }
function Clients() { return <Card className="p-5"><h3>Klienti</h3><p>GreenTech Solutions s.r.o. · Mesto Liptovský Hrádok · profily pre výpočet oprávnenosti a zhody.</p></Card>; }
function Matching({ grant }: { grant: typeof grants[number] }) { return <Card className="p-5"><div className="flex justify-between"><div><h3>{grant.matchClient}</h3><p className="text-slate-500">{grant.title}</p></div><div className="grid h-16 w-16 place-items-center rounded-lg bg-green-50 text-xl font-bold text-green-800">{grant.match}%</div></div><p className="mt-4">Splnené podmienky, nesplnené podmienky a údaje na overenie sa viažu na výzvu {grant.id}. Výsledok musí manuálne potvrdiť pracovník.</p></Card>; }
function Notifications({ grant }: { grant: typeof grants[number] }) { return <div className="grid gap-4 md:grid-cols-3">{["Okamžité upozornenia", "Denný súhrn", "Týždenný súhrn"].map((item) => <Card key={item} className="p-5"><h3>{item}</h3><p className="text-slate-600">Filter: {grant.id}</p><Badge tone="blue">Naplánované</Badge></Card>)}</div>; }
function Admin() { return <div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><h3>Správa používateľov</h3><p>Admin, pracovník, klient a RBAC.</p></Card><Card className="p-5"><h3>Nastavenie AI</h3><p>Modely, limity, prompt šablóny.</p></Card><Card className="p-5"><h3>Log kontrol a chýb</h3><p>Audit log, worker logy a monitoring.</p></Card></div>; }
