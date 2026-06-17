"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ARIAChat = dynamic(() => import("@/components/ARIA/ARIAChat"), { ssr: false });

export default function DashboardPage() {
  const [sessionId] = useState(() => uuidv4());

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-56 border-r border-zinc-800 flex flex-col p-4 gap-1 shrink-0">
        <div className="flex items-center gap-2 mb-6 mt-2">
          <span className="text-xl">🤖</span>
          <span className="font-bold text-sm tracking-wide">ARIA Platform</span>
        </div>
        {[
          { label: "Dashboard",  href: "/dashboard" },
          { label: "Clients",    href: "/clients" },
          { label: "Projects",   href: "/projects" },
          { label: "Tasks",      href: "/tasks" },
          { label: "Reports",    href: "/reports" },
          { label: "Approvals",  href: "/approvals" },
        ].map((item) => (
          <a key={item.href} href={item.href}
            className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            {item.label}
          </a>
        ))}
      </aside>

      {/* Main — ARIA Chat */}
      <main className="flex-1 p-4 overflow-hidden">
        <ARIAChat sessionId={sessionId} />
      </main>
    </div>
  );
}
