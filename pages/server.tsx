import { GetServerSideProps } from "next";
import { useState } from "react";

interface ServerPageProps {
  time: string;
}

export default function ServerPage({ time }: ServerPageProps) {
  const [result, setResult] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/hello", { method: "POST" });
    const data = await res.json();
    setResult(data.name);
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Server-side Rendered Page</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        This page uses <code>getServerSideProps</code> to fetch data on each
        request.
      </p>
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded mb-4">
        <span className="font-semibold">Current server time:</span> {time}
      </div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Run Server Action
      </button>
      {result && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded">
          <span className="font-semibold">API says:</span> {result}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ServerPageProps> = async () => {
  return {
    props: {
      time: new Date().toLocaleString(),
    },
  };
};
