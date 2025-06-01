import { useState } from "react";

// We'll use fetch to call the server API for encryption/decryption

export default function EncryptBrotliDemo() {
  const [input, setInput] = useState("{\"hello\":\"world\"}");
  const [password, setPassword] = useState("password");
  const [output, setOutput] = useState("");
  const [decrypted, setDecrypted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/encrypt-brotli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, password })
      });
      if (!res.ok) throw new Error("Encryption failed");
      const data = await res.json();
      setOutput(data.base64);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/encrypt-brotli", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: output, password })
      });
      if (!res.ok) throw new Error("Decryption failed");
      const data = await res.json();
      setDecrypted(JSON.stringify(data.json, null, 2));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-4 rounded">
      <h2 className="text-xl font-bold mb-2">AES + Brotli Encrypt/Compress Demo (Server-side)</h2>
      <textarea
        className="w-full border p-2 mb-2"
        rows={3}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter JSON object"
      />
      <input
        className="w-full border p-2 mb-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <div className="flex gap-2 mb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleEncrypt} disabled={loading}>Encrypt & Compress</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleDecrypt} disabled={loading}>Decompress & Decrypt</button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2">
        <div className="font-semibold">Base64 Output:</div>
        <textarea className="w-full border p-2" rows={2} value={output} readOnly />
      </div>
      {decrypted && (
        <div>
          <div className="font-semibold">Decrypted JSON:</div>
          <pre className="bg-gray-200 p-2 rounded text-black">{decrypted}</pre>
        </div>
      )}
    </div>
  );
}
