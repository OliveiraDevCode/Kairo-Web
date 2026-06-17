import { useTheme } from "@/shared/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Current theme: {theme}</span>
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer rounded border px-3 py-1 text-sm transition-colors"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
          borderColor: "var(--color-border)",
        }}
      >
        Toggle theme
      </button>
    </div>
  );
}
