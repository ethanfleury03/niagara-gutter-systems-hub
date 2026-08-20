"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    href: "/inventory/",
    title: "Inventory application",
    detail: "Assess, stabilize, and improve what already exists.",
    state: "Assessment plan",
  },
  {
    number: "02",
    href: "/pricing/",
    title: "Pricing calculator",
    detail: "Capture Brad’s pricing logic in a controlled model.",
    state: "Build next",
  },
  {
    number: "03",
    href: "/integration/",
    title: "CRM → QuickBooks",
    detail: "Move approved records once and reconcile every handoff.",
    state: "Pipeline plan",
  },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <nav className="site-header" aria-label="Primary navigation">
        <span className="header-state">
          <span className="state-full">Private concept</span>
          <span className="state-short">Concept</span>
        </span>
        <Link className="header-wordmark" href="/" onClick={() => setOpen(false)}>
          <span className="wordmark-full">Niagara Gutter Systems Hub</span>
          <span className="wordmark-short">NG Systems</span>
        </Link>
        <button
          className="project-menu-button"
          type="button"
          aria-label="Projects"
          aria-expanded={open}
          aria-controls="project-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="project-button-label">Projects</span>
        </button>
      </nav>

      {open && (
        <>
          <button className="menu-backdrop" aria-label="Close project menu" onClick={() => setOpen(false)} />
          <section className="project-menu" id="project-menu" aria-label="Project pages">
            <header className="project-menu-header">
              <div>
                <p>Niagara Gutter systems plan</p>
                <h2>Choose a workstream</h2>
              </div>
              <button className="menu-close" type="button" onClick={() => setOpen(false)} aria-label="Close project menu">
                Close
              </button>
            </header>
            <div className="project-menu-list">
              {projects.map((project) => {
                const active = pathname.startsWith(project.href.replace(/\/$/, ""));
                return (
                  <Link
                    className={`project-menu-link${active ? " is-active" : ""}`}
                    href={project.href}
                    key={project.number}
                    onClick={() => setOpen(false)}
                  >
                    <span className="project-menu-number">{project.number}</span>
                    <span className="project-menu-copy">
                      <strong>{project.title}</strong>
                      <small>{project.detail}</small>
                    </span>
                    <span className="project-menu-state">{project.state}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}
