'use client';

import { useState } from 'react';
import FormField from '@/components/forms/FormField';
import BasicInfoTab from '@/components/forms/BasicInfoTab';
import ClientSelectionTab from '@/components/forms/ClientSelectionTab';
import { useUserForm } from '@/hooks/useUserForm';
import { useClientSelection } from '@/hooks/useClientSelection';

export default function CreateUser() {
  const [activeTab, setActiveTab] = useState('basic');
  const { cpf, setCpf, userType, setUserType, formData, handleInputChange, handleSubmit } = useUserForm();
  const { selectedClients, searchTerm, setSearchTerm, filteredUsers, toggleClientSelection } = useClientSelection(userType);

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
    setActiveTab('basic');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(selectedClients);
  };

  return (
    <main className='pt-12 flex justify-center font-red-hat-display text-brand-white text-sm'>
      <form onSubmit={onSubmit} className='bg-background p-8 border border-grey-border rounded-lg max-w-2xl w-full'>
        <h1 className='text-2xl font-extrabold mb-8 text-center'>Criar usuário</h1>
        
        <FormField
          label='Tipo do usuário'
          name='type'
          value={userType}
          onChange={handleUserTypeChange}
          options={[
            { value: 'USER', label: 'Usuário' },
            { value: 'CONSULTANT', label: 'Consultor' }
          ]}
        />

        <div className='grid grid-cols-2 gap-4 mb-6 mt-6'>
          <FormField
            label='Nome'
            name='name'
            placeholder='Digite o nome'
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
          />
          <FormField
            label='Telefone'
            name='phone'
            placeholder='Digite o telefone'
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
            placeholder='Digite o email'
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
            {userType === 'CONSULTANT' && (
              <button
                type='button'
                onClick={() => setActiveTab('clients')}
                className={`px-4 py-2 ml-4 ${activeTab === 'clients' ? 'border-b-2 border-brand-bright-green text-brand-bright-green' : 'text-gray-400'}`}
              >
                Adicionar clientes
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'basic' && (
          <BasicInfoTab
            formData={formData}
            cpf={cpf}
            onInputChange={handleInputChange}
            onCpfChange={setCpf}
          />
        )}

        {activeTab === 'clients' && userType === 'CONSULTANT' && (
          <ClientSelectionTab
            filteredUsers={filteredUsers}
            selectedClients={selectedClients}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onToggleClient={toggleClientSelection}
          />
        )}

        <div className='flex justify-center mt-8'>
          <button type='submit' className='bg-brand-green hover:bg-brand-green-hover hover:cursor-pointer text-brand-bright-green px-4 py-3 rounded-lg'>
            Criar Usuário
          </button>
        </div>
      </form>
    </main>
  );
}