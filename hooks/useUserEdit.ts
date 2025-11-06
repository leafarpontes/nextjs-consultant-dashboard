import { useState, useEffect } from 'react';
import { User } from '@/types/user';

export const useUserEdit = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredUsers = Array.isArray(allUsers) ? allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setAllUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    allUsers,
    selectedUser,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    selectUser,
    loading
  };
};