// Example API route for table data
import type { NextApiRequest, NextApiResponse } from "next";

const data = [
  { id: 1, name: "Alice", age: 30, city: "New York", status: "Active" },
  { id: 2, name: "Bob", age: 25, city: "San Francisco", status: "Inactive" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago", status: "Active" },
  { id: 4, name: "Diana", age: 32, city: "Boston", status: "Active" },
  { id: 5, name: "Eve", age: 27, city: "Seattle", status: "Inactive" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ data });
}
