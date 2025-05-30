import { useTheme } from "../components/ThemeContext";

export default function ThemeStatusPage() {
  const { theme } = useTheme();
  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Theme Status</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        This page also uses <code>useContext</code> to read the current theme.
      </p>
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded">
        <span className="font-semibold">Theme:</span> {theme}
      </div>
    </div>
  );
}
