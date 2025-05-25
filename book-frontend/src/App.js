import React, { useState, useEffect } from "react";

const API_BASE = "http://52.79.93.185:3000";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (title) query.append("title", title);
    if (author) query.append("author", author);

    fetch(`${API_BASE}/search?${query.toString()}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(console.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 이승우의 도서 관리</h1>
      <div>
        <input
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="저자"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            <b>{book.title}</b> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
