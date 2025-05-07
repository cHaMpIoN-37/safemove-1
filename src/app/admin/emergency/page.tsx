"use client";
import React, { useState, useEffect } from 'react';

interface SecurityAction {
  id: number;
  description: string;
  takenBy: string; // "warden" or "student"
  timestamp: string;
}

export default function EmergencyPage() {
  const [emergencyNumber, setEmergencyNumber] = useState<string>('');
  const [securityActions, setSecurityActions] = useState<SecurityAction[]>([]);
  const [loadingEmergency, setLoadingEmergency] = useState(true);
  const [loadingActions, setLoadingActions] = useState(true);
  const [errorEmergency, setErrorEmergency] = useState<string | null>(null);
  const [errorActions, setErrorActions] = useState<string | null>(null);

  const fetchEmergencyNumber = async () => {
    setLoadingEmergency(true);
    setErrorEmergency(null);
    try {
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setEmergencyNumber(data.emergencyNumber.toString().padStart(2, '0'));
      } else {
        setErrorEmergency('Failed to fetch emergency number');
      }
    } catch (err) {
      setErrorEmergency('Error fetching emergency number');
    } finally {
      setLoadingEmergency(false);
    }
  };

  const fetchSecurityActions = async () => {
    setLoadingActions(true);
    setErrorActions(null);
    try {
      const response = await fetch('/api/security-actions');
      if (response.ok) {
        const data = await response.json();
        setSecurityActions(data.actions);
      } else {
        setErrorActions('Failed to fetch security actions');
      }
    } catch (err) {
      setErrorActions('Error fetching security actions');
    } finally {
      setLoadingActions(false);
    }
  };

  React.useEffect(() => {
    fetchEmergencyNumber();
    fetchSecurityActions();
  }, []);

  const handleCallMe = () => {
    alert(`Calling emergency number: ${emergencyNumber}`);
  };

  const handleRefreshActions = () => {
    fetchSecurityActions();
  };

  return (
    <main className="p-6 max-w-3xl mx-auto font-serif">
      <h1 className="text-4xl font-bold mb-6 border-b pb-2 border-gray-300">Emergency Management</h1>

      <section className="mb-6">
        <p className="text-lg">Current Emergency Number:</p>
        {loadingEmergency ? (
          <p>Loading emergency number...</p>
        ) : errorEmergency ? (
          <p className="text-red-600">{errorEmergency}</p>
        ) : (
          <>
            <p className="text-6xl font-extrabold text-red-700 mb-4">{emergencyNumber}</p>
            <button
              onClick={handleCallMe}
              className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 transition"
              aria-label="Call emergency number"
            >
              Call Me
            </button>
          </>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1">Security Actions Taken</h2>
          <button
            onClick={handleRefreshActions}
            className="text-blue-600 hover:underline text-sm"
            aria-label="Refresh security actions"
          >
            Refresh
          </button>
        </div>
        {loadingActions ? (
          <p>Loading security actions...</p>
        ) : errorActions ? (
          <p className="text-red-600">{errorActions}</p>
        ) : securityActions.length === 0 ? (
          <p>No security actions recorded.</p>
        ) : (
          <ul className="space-y-4">
            {securityActions.map((action) => (
              <li
                key={action.id}
                className={`border p-4 rounded shadow ${
                  action.takenBy === 'warden' ? 'bg-blue-50 border-blue-400' : 'bg-green-50 border-green-400'
                }`}
              >
                <p className="italic">"{action.description}"</p>
                <p className="text-sm mt-1">
                  Taken by:{' '}
                  <span
                    className={`font-semibold ${
                      action.takenBy === 'warden' ? 'text-blue-700' : 'text-green-700'
                    } capitalize`}
                  >
                    {action.takenBy === 'warden' ? 'Hostel Warden' : 'User'}
                  </span>{' '}
                  on {new Date(action.timestamp).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
