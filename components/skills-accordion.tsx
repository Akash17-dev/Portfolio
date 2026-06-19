"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Boxes, BrainCircuit, ChevronDown, Code2, Database, ServerCog, ShieldCheck } from "lucide-react";
import { MotionDiv } from "@/components/motion";

type Skill = {
  title: string;
  items: string[];
  level: number;
  focus: string;
};

const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  "AI & Machine Learning": BrainCircuit,
  "Data Science": Database,
  "Full-Stack Engineering": Code2,
  "Security & DevOps": ServerCog,
  "Cloud & Database": Boxes,
  Cybersecurity: ShieldCheck,
};

export function SkillsAccordion({ skills }: { skills: Skill[] }) {
  const [openSkill, setOpenSkill] = useState(skills[0]?.title || "");

  return (
    <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 shadow-glass backdrop-blur">
      <div className="md:hidden">
        {skills.map((skill) => {
          const isOpen = openSkill === skill.title;
          const Icon = skillIcons[skill.title] || Code2;

          return (
            <div key={skill.title} className="border-b border-white/10 last:border-b-0">
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenSkill(isOpen ? "" : skill.title)}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.055] text-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black text-white">{skill.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-white/50">{skill.level}% depth</span>
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-white/45 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen ? (
                <div className="px-4 pb-5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-cyan" style={{ width: `${skill.level}%` }} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/[0.62]">{skill.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.slice(0, 5).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/[0.68]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-[0.5fr_1.1fr_1.6fr_1.3fr] border-b border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/[0.38]">
          <span>Depth</span>
          <span>Capability</span>
          <span>Focus</span>
          <span>Tools</span>
        </div>

        {skills.map((skill, index) => (
          <DesktopSkillRow key={skill.title} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

function DesktopSkillRow({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skillIcons[skill.title] || Code2;

  return (
    <MotionDiv
      className="group grid gap-4 border-b border-white/10 px-5 py-5 transition duration-300 last:border-b-0 hover:bg-white/[0.045] md:grid-cols-[0.5fr_1.1fr_1.6fr_1.3fr] md:items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05 }}
    >
      <div>
        <div className="mb-2 text-xs font-bold text-white/60">
          <span>{skill.level}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <MotionDiv
            className="h-full rounded-full bg-cyan"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.055] text-cyan transition group-hover:border-cyan/30 group-hover:bg-cyan/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-black tracking-[-0.02em] text-white">{skill.title}</h3>
      </div>

      <p className="text-sm leading-6 text-white/[0.58]">{skill.focus}</p>

      <div className="flex flex-wrap gap-2">
        {skill.items.slice(0, 5).map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/[0.68]">
            {item}
          </span>
        ))}
      </div>
    </MotionDiv>
  );
}
