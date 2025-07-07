import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/url"; // Adjust if needed

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validityMinutes, setValidityMinutes] = useState<number | undefined>();
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/shorten`, {
        originalUrl,
        customCode,
        validityMinutes,
      });
      setResult(res.data.shortUrl);
    } catch (err: any) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Validity in minutes (optional)"
          value={validityMinutes || ""}
          onChange={(e) => setValidityMinutes(Number(e.target.value))}
        />
        <button type="submit">Shorten</button>
      </form>
      {result && (
        <p>
          Shortened URL: <a href={result}>{result}</a>
        </p>
      )}
    </div>
  );
};

export default ShortenerForm;
