import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

interface Row {
  id: number;
  name: string;
  age: number;
  city: string;
  status: string;
}

type SortKey = keyof Row;
type SortDirection = "asc" | "desc";

export default function TableDemoPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    fetch("/api/table-data")
      .then((res) => res.json())
      .then((data) => setRows(data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortArrow = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4">Flowbite Table Demo</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHead>
            <TableHeadCell onClick={() => handleSort("id")} className="cursor-pointer select-none">
              ID{renderSortArrow("id")}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort("name")} className="cursor-pointer select-none">
              Name{renderSortArrow("name")}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort("age")} className="cursor-pointer select-none">
              Age{renderSortArrow("age")}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort("city")} className="cursor-pointer select-none">
              City{renderSortArrow("city")}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort("status")} className="cursor-pointer select-none">
              Status{renderSortArrow("status")}
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {sortedRows.map((row) => (
              <TableRow key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
