import React, { useEffect, useState } from 'react';
import api from '../services/api';

const User_table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setLoading(true);
      setMessage('');

      try {
        if (!api.auth.isLoggedIn()) {
          setMessage('You are not admin');
          return;
        }

        const data = await api.admin.getUsers();
        if (isMounted) {
          setUsers(Array.isArray(data.users) ? data.users : []);
        }
      } catch (error) {
        if (isMounted) {
          setMessage('You are not admin');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 px-6 text-yellow-100 flex items-start justify-center">
        <div className="w-full max-w-5xl rounded-xl border border-yellow-400/30 bg-gray-950 p-8 text-center">
          Loading users...
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen bg-black pt-28 px-6 text-yellow-100 flex items-start justify-center">
        <div className="w-full max-w-xl rounded-xl border border-red-500/40 bg-red-950/30 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-300">{message}</h1>
          <p className="mt-3 text-sm text-red-100/70">Only admin users can view the user table.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 px-6 text-yellow-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-yellow-300">User Table</h1>
          <p className="mt-2 text-sm text-yellow-100/60">Admin-only view of registered users.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-yellow-400/30 bg-gray-950">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead className="bg-yellow-400/10 text-yellow-300">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-yellow-400/10 hover:bg-yellow-400/5">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3 font-medium text-white">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phoneNumber || '-'}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md border border-yellow-400/30 px-2 py-1 text-xs font-bold text-yellow-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{user.status}</td>
                  <td className="px-4 py-3">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-yellow-100/60" colSpan="7">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User_table;
