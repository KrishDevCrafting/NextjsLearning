// app/page.tsx
import { getBooks, addBook } from "../backend/action"; // Import backend logic directly!

export default async function BookStore() {
  // 1. Fetching: Just call the function. It runs on the server before HTML is sent.
  const books = await getBooks();

  return (
    <div className="p-10">
      <h1>📚 Simple Book Store</h1>

      {/* 2. Displaying Data */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>

      {/* 3. The "API" Call: Pass the Server Action to the form */}
      <form action={addBook} className="mt-4 flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="New Book Title"
          className="border p-2 text-white"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Book
        </button>
      </form>
    </div>
  );
}
