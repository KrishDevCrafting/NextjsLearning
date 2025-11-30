"use server"; // <--- This magic line makes it a backend function!
import { revalidatePath } from "next/cache";

// Imagine this is your database connection
const booksDB = [
  { id: 1, title: "The Great Gatsby" },
  { id: 2, title: "1984" },
  { id: 3, title: "To Kill a Mockingbird" },
];

export async function addBook(formData: FormData) {
  // 1. Get data directly from the form
  const title = formData.get("title") as string;

  // 2. Mutate Database (Simulated here)
  booksDB.push({ id: Date.now(), title });

  // 3. Tell Next.js to refresh the page automatically
  revalidatePath("/");
}

export async function getBooks() {
  return booksDB;
}
// SEC 