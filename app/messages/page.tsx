
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
}

interface User {
  id: string;
  email: string;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (session) {
      socket = io();

      socket.on('connect', () => {
        console.log('Connected to socket server');
        socket.emit('join', session.user.id);
      });

      socket.on('message', (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      async function fetchUsers() {
        try {
          const res = await fetch('/api/users');
          if (res.ok) {
            const data = await res.json();
            setUsers(data);
          }
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      }

      fetchUsers();

      return () => {
        socket.disconnect();
      };
    }
  }, [session]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && message && recipient) {
      const newMessage = {
        senderId: session.user.id,
        receiverId: recipient,
        content: message,
      };

      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (res.ok) {
          socket.emit('message', newMessage);
          setMessage('');
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <div className="flex">
        <div className="w-1/3 border-r pr-4">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className={`cursor-pointer p-2 rounded-lg ${
                  recipient === user.id ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setRecipient(user.id)}
              >
                {user.email}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 pl-4">
          <div className="border rounded-lg p-4 h-96 overflow-y-scroll">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <strong>{msg.senderId}: </strong>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="mt-4 flex">
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
