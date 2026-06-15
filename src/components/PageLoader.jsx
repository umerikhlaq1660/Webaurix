import { useTheme } from "../context/ThemeContext";

export default function PageLoader() {
  const { isDark } = useTheme();

  const bg = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "2px solid rgba(104,181,204,0.15)",
          borderTopColor: "#68b5cc",
          animation: "page-spin 0.75s linear infinite",
        }}
      />
      <style>{`@keyframes page-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
