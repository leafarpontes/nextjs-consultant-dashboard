import { User } from '@/types/user';

interface ClientSelectionTabProps {
  filteredUsers: User[];
  selectedClients: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleClient: (userId: string) => void;
}

export default function ClientSelectionTab({ 
  filteredUsers, selectedClients, searchTerm, onSearchChange, onToggleClient 
}: ClientSelectionTabProps) {
  return (
    <div className='mb-8'>
      <h3 className='text-base font-semibold mb-4'>Selecionar Clientes</h3>
      <input
        type='text'
        placeholder='Buscar por nome ou email...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='bg-grey-border p-2 rounded-lg w-full mb-4'
      />
      <div className='max-h-60 overflow-y-auto border border-grey-border rounded-lg p-4'>
        {filteredUsers.map((user: User) => (
          <div key={user.id} className='flex items-center mb-3'>
            <input
              type='checkbox'
              id={`client-${user.id}`}
              checked={selectedClients.includes(user.id)}
              onChange={() => onToggleClient(user.id)}
              className='mr-3'
            />
            <label htmlFor={`client-${user.id}`} className='flex-1 cursor-pointer'>
              <div className='font-medium'>{user.name}</div>
              <div className='text-sm text-gray-400'>{user.email}</div>
            </label>
          </div>
        ))}
        {filteredUsers.length === 0 && searchTerm && (
          <div className='text-center text-gray-400 py-4'>
            Nenhum usuário encontrado
          </div>
        )}
      </div>
      <div className='mt-4 text-sm text-gray-400'>
        {selectedClients.length} cliente(s) selecionado(s) • {filteredUsers.length} usuário(s) encontrado(s)
      </div>
    </div>
  );
}