import { useState, useEffect, useMemo } from 'react';
import { User } from '@/types/user';

export const useClientSelection = (userType: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleClientSelection = (userId: string) => {
    setSelectedClients(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (userType === 'CONSULTANT') {
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      }
    };
    fetchUsers();
  }, [userType]);

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return {
    users,
    selectedClients,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    toggleClientSelection
  };
};