import { useTheme } from "../components/ThemeContext";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export default function ThemePage() {
  const { theme, toggleTheme } = useTheme();
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (prevTheme.current !== theme) {
      toast.success(`Theme changed to ${theme}`);
      prevTheme.current = theme;
    }
  }, [theme]);

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Theme Context Example</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        The current theme is <span className="font-semibold">{theme}</span>.
      </p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Toggle Theme
      </button>
    </div>
  );
}
