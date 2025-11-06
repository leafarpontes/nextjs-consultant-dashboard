'use client';

import { useState, useEffect } from 'react';
import UserSelector from '@/components/forms/UserSelector';
import FormField from '@/components/forms/FormField';
import ClientSelectionTab from '@/components/forms/ClientSelectionTab';
import { useUserEdit } from '@/hooks/useUserEdit';
import { useClientSelection } from '@/hooks/useClientSelection';
import { BRAZILIAN_STATES } from '@/constants/states';

export default function EditUser() {
  const [activeTab, setActiveTab] = useState('basic');
  const [cpf, setCpf] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    cep: '',
    state: '',
    address: '',
    complement: ''
  });

  const { selectedUser, searchTerm, setSearchTerm, filteredUsers, selectUser, loading } = useUserEdit();
  const { selectedClients, setSelectedClients, searchTerm: clientSearchTerm, setSearchTerm: setClientSearchTerm, filteredUsers: availableClients, toggleClientSelection } = useClientSelection(selectedUser?.type || 'USER');

  // Load user data when selected
  useEffect(() => {
    if (selectedUser) {
      // Batch all state updates together
      const updateStates = () => {
        setFormData({
          name: selectedUser.name,
          phone: selectedUser.phone,
          email: selectedUser.email,
          age: selectedUser.age.toString(),
          cep: selectedUser.cep,
          state: selectedUser.state,
          address: selectedUser.address,
          complement: selectedUser.addressComplement || ''
        });
        setCpf(selectedUser.cpf);
        
        // Set selected clients if user is consultant
        if (selectedUser.type === 'CONSULTANT' && selectedUser.clients) {
          setSelectedClients(selectedUser.clients.map(client => client.id));
        } else {
          setSelectedClients([]);
        }
      };
      
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(updateStates, 0);
    }
  }, [selectedUser, setSelectedClients]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;

    const userData = {
      id: selectedUser.id,
      type: selectedUser.type,
      ...formData,
      age: parseInt(formData.age),
      addressComplement: formData.complement,
      selectedClients: selectedUser.type === 'CONSULTANT' ? selectedClients : []
    };

    try {
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        alert('Usuário atualizado com sucesso!');
        window.location.href = '/';
      } else {
        alert('Erro ao atualizar usuário');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  if (!selectedUser) {
    return (
      <main className='pt-12 flex justify-center font-red-hat-display text-brand-white text-sm'>
        <div className='bg-background p-8 border border-grey-border rounded-lg max-w-2xl w-full'>
          <h1 className='text-2xl font-extrabold mb-8 text-center'>Editar Usuário</h1>
          <UserSelector
            users={filteredUsers}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectUser={selectUser}
            loading={loading}
          />
        </div>
      </main>
    );
  }

  return (
    <main className='pt-12 flex justify-center font-red-hat-display text-brand-white text-sm'>
      <form onSubmit={handleSubmit} className='bg-background p-8 border border-grey-border rounded-lg max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-extrabold'>Editar Usuário</h1>
          <button
            type='button'
            onClick={() => selectUser(null)}
            className='text-sm text-gray-400 hover:text-white'
          >
            ← Voltar à seleção
          </button>
        </div>

        <div className='mb-6 p-4 bg-gray-800 rounded-lg'>
          <div className='text-sm text-gray-400'>Editando:</div>
          <div className='font-medium'>{selectedUser.name}</div>
          <div className='text-sm text-gray-400'>{selectedUser.email}</div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <FormField
            label='Nome'
            name='name'
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
          />
          <FormField
            label='Telefone'
            name='phone'
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            required
          />
        </div>

        <div className='mb-6'>
          <FormField
            label='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            required
          />
        </div>

        {/* Tabs */}
        <div className='mb-6'>
          <div className='flex border-b border-grey-border'>
            <button
              type='button'
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 ${activeTab === 'basic' ? 'border-b-2 border-brand-bright-green text-brand-bright-green' : 'text-gray-400'}`}
            >
              Informações básicas
            </button>
            {selectedUser.type === 'CONSULTANT' && (
              <button
                type='button'
                onClick={() => setActiveTab('clients')}
                className={`px-4 py-2 ml-4 ${activeTab === 'clients' ? 'border-b-2 border-brand-bright-green text-brand-bright-green' : 'text-gray-400'}`}
              >
                Gerenciar clientes
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'basic' && (
          <div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <FormField
                label='Idade'
                name='age'
                type='number'
                value={formData.age}
                onChange={(value) => handleInputChange('age', value)}
                required
              />
              <div>
                <label htmlFor='cpf' className='block mb-2'>CPF</label>
                <input
                  name='cpf'
                  id='cpf'
                  type='text'
                  value={cpf}
                  disabled
                  className='bg-gray-600 p-2 rounded-lg w-full cursor-not-allowed opacity-50'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <FormField
                label='CEP'
                name='cep'
                value={formData.cep}
                onChange={(value) => handleInputChange('cep', value)}
                required
              />
              <FormField
                label='Estado'
                name='state'
                value={formData.state}
                onChange={(value) => handleInputChange('state', value)}
                options={BRAZILIAN_STATES}
                required
              />
            </div>

            <FormField
              label='Endereço'
              name='address'
              value={formData.address}
              onChange={(value) => handleInputChange('address', value)}
              required
            />

            <div className='mt-4'>
              <FormField
                label='Complemento'
                name='complement'
                value={formData.complement}
                onChange={(value) => handleInputChange('complement', value)}
              />
            </div>
          </div>
        )}

        {activeTab === 'clients' && selectedUser.type === 'CONSULTANT' && (
          <ClientSelectionTab
            filteredUsers={availableClients}
            selectedClients={selectedClients}
            searchTerm={clientSearchTerm}
            onSearchChange={setClientSearchTerm}
            onToggleClient={toggleClientSelection}
          />
        )}

        <div className='flex justify-center mt-8'>
          <button type='submit' className='bg-[#3F321B] hover:bg-[#594925] hover:cursor-pointer text-[#F7C700] px-4 py-3 rounded-lg'>
            Atualizar Usuário
          </button>
        </div>
      </form>
    </main>
  );
}