'use client';

import { useState, useEffect } from 'react';

interface TestRecord {
  id: string;
  name: string;
  description?: string;
  value: number;
  isActive: boolean;
  createdAt: string;
}

export default function Home() {
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTestName, setNewTestName] = useState('');

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/test');
      const data = await response.json();

      if (data.success) {
        setTests(data.data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch test records');
    } finally {
      setLoading(false);
    }
  };

  const createTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim()) return;

    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTestName.trim(),
          description: `Test record created at ${new Date().toLocaleString()}`,
          value: Math.floor(Math.random() * 1000),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewTestName('');
        fetchTests(); // Refresh the list
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to create test record');
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Welcome to Next.js Template with Sequelize</h1>
      <p>Database connection test - Create and view test records.</p>

      {/* Create new test record */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Create New Test Record</h3>
        <form onSubmit={createTest} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            value={newTestName}
            onChange={(e) => setNewTestName(e.target.value)}
            placeholder="Enter test name..."
            style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create
          </button>
        </form>
      </div>

      {/* Display test records */}
      <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Test Records ({tests.length})</h3>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && tests.length === 0 && (
          <p>No test records found. Create your first test record above!</p>
        )}

        {tests.map((test) => (
          <div key={test.id} style={{
            padding: '1rem',
            marginBottom: '0.5rem',
            border: '1px solid #eee',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            <h4>{test.name}</h4>
            {test.description && <p>{test.description}</p>}
            <p><strong>Value:</strong> {test.value}</p>
            <p><strong>Active:</strong> {test.isActive ? 'Yes' : 'No'}</p>
            <p><small>Created: {new Date(test.createdAt).toLocaleString()}</small></p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Database Setup Instructions</h3>
        <ol>
          <li>Create a <code>.env.local</code> file in the project root</li>
          <li>Add your database URL: <code>DATABASE_URL="postgresql://username:password@localhost:5432/dbname"</code></li>
          <li>Run <code>npm run db:push</code> to create the database schema</li>
          <li>Run <code>npm run db:seed</code> to populate test data</li>
          <li>Refresh this page to see the test records</li>
        </ol>
      </div>
    </main>
  );
}
