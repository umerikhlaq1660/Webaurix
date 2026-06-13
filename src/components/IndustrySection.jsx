import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const IndustrySection = ({ data, onCTA }) => {
  if (!data) return null;

  const { isDark } = useTheme();

  const bg = isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
  const P  = isDark ? "#f0eeec"                : "#0c0c10";
  const M  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
  const A  = isDark ? "#68b5cc"                : "#0e7490";
  const Br = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const Cd = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";

  return (
    <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: bg }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right,transparent,${A}28,transparent)` }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── header ── */}
        <div className="mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
            className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3"
            style={{ color:A }}
          >
            Industries We Serve
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <motion.h2
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
              transition={{ delay:0.06, duration:0.55, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
              className="text-[26px] sm:text-[38px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color:P }}
            >
              {(() => {
                const words = data.title.split(" ");
                if (words.length < 2) return data.title;
                return (
                  <>
                    {words.slice(0, -1).join(" ")}{" "}
                    <span style={{ color:A }}>{words.at(-1)}</span>
                  </>
                );
              })()}
            </motion.h2>
            {data.desc && (
              <motion.p
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:0.12, duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                className="text-[13.5px] leading-[1.75] max-w-[280px] sm:text-right shrink-0"
                style={{ color:M }}
              >
                {data.desc}
              </motion.p>
            )}
          </div>
        </div>

        {/* ── MOBILE: vertical list ── */}
        <div className="sm:hidden flex flex-col">
          {data.industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity:0, x:-16 }}
                whileInView={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.05, duration:0.45, ease:[0.22,1,0.36,1] }}
                viewport={{ once:true }}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: `1px solid ${Br}` }}
              >
                {/* icon */}
                {Icon && (
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background:`${A}14`, color:A, border:`1px solid ${A}22` }}
                  >
                    <Icon size={16} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold leading-snug mb-1" style={{ color:P }}>
                    {industry.name}
                  </h3>
                  {industry.desc && (
                    <p className="text-[12px] leading-[1.7]" style={{ color:M }}>
                      {industry.desc}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── TABLET / DESKTOP: grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {data.industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.06, duration:0.5, ease:[0.22,1,0.36,1] }}
                viewport={{ once:true }}
                whileHover={{ y:-4, transition:{ duration:0.2, ease:[0.22,1,0.36,1] } }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${A}40`;
                  e.currentTarget.style.background = isDark ? "rgba(104,181,204,0.05)" : "rgba(14,116,144,0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = Br;
                  e.currentTarget.style.background = Cd;
                }}
                className="flex flex-col gap-3 p-5 rounded-2xl cursor-default"
                style={{
                  background: Cd,
                  border: `1px solid ${Br}`,
                  willChange: "transform",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              >
                {Icon && (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${A}14`, color:A, border:`1px solid ${A}22` }}
                  >
                    <Icon size={18} />
                  </div>
                )}
                <h3 className="text-[14px] lg:text-[15px] font-bold leading-snug" style={{ color:P }}>
                  {industry.name}
                </h3>
                {industry.desc && (
                  <p className="text-[12.5px] leading-[1.75]" style={{ color:M }}>
                    {industry.desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {data.btnText && (
          <motion.div
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.2, duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
            className="flex justify-center mt-10 sm:mt-12"
          >
            <motion.button
              onClick={onCTA}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer"
              style={{ background:A, color: isDark ? "#0b0b0e" : "#ffffff", boxShadow:`0 4px 20px ${A}35` }}
            >
              {data.btnText}
              <ArrowUpRight size={15} />
            </motion.button>
          </motion.div>
        )}

      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background:`linear-gradient(to right,transparent,${A}18,transparent)` }} />
    </section>
  );
};

export default IndustrySection;
