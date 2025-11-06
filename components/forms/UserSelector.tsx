import { User } from '@/types/user';

interface UserSelectorProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectUser: (user: User) => void;
  loading: boolean;
}

export default function UserSelector({ 
  users, searchTerm, onSearchChange, onSelectUser, loading 
}: UserSelectorProps) {
  return (
    <div className='mb-8'>
      <h2 className='text-xl font-bold mb-4'>Selecionar Usuário</h2>
      
      <input
        type='text'
        placeholder='Buscar por nome ou email...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='bg-grey-border p-3 rounded-lg w-full mb-4'
      />

      {loading ? (
        <div className='text-center py-4'>Carregando usuários...</div>
      ) : (
        <div className='max-h-60 overflow-y-auto border border-grey-border rounded-lg'>
          {users.map((user) => (
            <div 
              key={user.id} 
              onClick={() => onSelectUser(user)}
              className='p-4 border-b border-grey-border hover:bg-gray-700 cursor-pointer'
            >
              <div className='font-medium'>{user.name}</div>
              <div className='text-sm text-gray-400'>{user.email}</div>
              <div className='text-xs text-gray-500'>
                {user.type === 'CONSULTANT' ? 'Consultor' : 'Usuário'}
              </div>
            </div>
          ))}
          {users.length === 0 && searchTerm && (
            <div className='text-center text-gray-400 py-4'>
              Nenhum usuário encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
}