// pages/index.js
import { useClient } from 'next/urql'; // Import useClient from Next.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  // Wrap the component with useClient to ensure it's rendered on the client side
  useClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/shorten', { originalUrl });
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
        </div>
      )}
    </div>
  );
}
