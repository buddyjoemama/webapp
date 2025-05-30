import { useEffect, useState } from "react";
import ApiMessageBox from "../components/ApiMessageBox";

export default function About() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.name));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        This is an example About page. You can put any information about your
        project or yourself here.
      </p>
      <ApiMessageBox message={apiMessage} />
    </div>
  );
}
