interface ApiMessageBoxProps {
  message: string;
}

export default function ApiMessageBox({ message }: ApiMessageBoxProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded">
      <span className="font-semibold">API says:</span> {message}
    </div>
  );
}
