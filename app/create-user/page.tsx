'use client';

import { useState, useEffect, useMemo } from 'react';
import { User } from '@/types/user';

export default function CreateUser() {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('USER');
  const [activeTab, setActiveTab] = useState('basic');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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


  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setCpf(formatted);
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
    setActiveTab('basic');
  };

  const toggleClientSelection = (userId: string) => {
    setSelectedClients(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userData = {
      type: userType,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      cpf: cpf,
      cep: formData.cep,
      state: formData.state,
      address: formData.address,
      addressComplement: formData.complement,
      selectedClients: userType === 'CONSULTANT' ? selectedClients : []
    };

    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        alert('Usuário criado com sucesso!');
        window.location.href = '/';
      } else {
        alert('Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao criar usuário');
    }
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

  return (
    <main className='pt-12 flex justify-center font-red-hat-display text-brand-white text-sm'>
      <form onSubmit={handleSubmit} className='bg-background p-8 border border-grey-border rounded-lg max-w-2xl w-full'>
        <h1 className='text-2xl font-extrabold mb-8 text-center'>Criar usuário</h1>
        
        <div className='mb-6'>
          <label htmlFor='type' className='block mb-2'>
            Tipo do usuário
          </label>
          <select
            name='type'
            id='type'
            value={userType}
            onChange={handleUserTypeChange}
            className='bg-grey-border p-2 rounded-lg w-full'
          >
            <option value='USER'>Usuário</option>
            <option value='CONSULTANT'>Consultor</option>
          </select>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div>
            <label htmlFor='name' className='block mb-2'>
              Nome
            </label>
            <input
              name='name'
              id='name'
              type='text'
              placeholder='Digite o nome'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className='bg-grey-border p-2 rounded-lg w-full'
            />
          </div>
          <div>
            <label htmlFor='phone' className='block mb-2'>
              Telefone
            </label>
            <input
              name='phone'
              id='phone'
              type='text'
              placeholder='Digite o telefone'
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className='bg-grey-border p-2 rounded-lg w-full'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2'>
            Email
          </label>
          <input
            name='email'
            id='email'
            type='email'
            placeholder='Digite o email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className='bg-grey-border p-2 rounded-lg w-full'
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
          <div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label htmlFor='age' className='block mb-2'>
                  Idade
                </label>
                <input
                  name='age'
                  id='age'
                  type='number'
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  required
                  className='bg-grey-border p-2 rounded-lg w-full'
                />
              </div>
              <div>
                <label htmlFor='cpf' className='block mb-2'>
                  CPF
                </label>
                <input
                  name='cpf'
                  id='cpf'
                  type='text'
                  placeholder='000.000.000-00'
                  value={cpf}
                  onChange={handleCpfChange}
                  className='bg-grey-border p-2 rounded-lg w-full'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label htmlFor='cep' className='block mb-2'>
                  CEP
                </label>
                <input
                  name='cep'
                  id='cep'
                  type='text'
                  placeholder='Insira o CEP'
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  required
                  className='bg-grey-border p-2 rounded-lg w-full'
                />
              </div>
              <div>
                <label htmlFor='state' className='block mb-2'>
                  Estado
                </label>
                <select
                  name='state'
                  id='state'
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                  className='bg-grey-border p-2 rounded-lg w-full'
                >
                  <option value=''>Selecione o estado</option>
                  <option value='AC'>Acre</option>
                  <option value='AL'>Alagoas</option>
                  <option value='AP'>Amapá</option>
                  <option value='AM'>Amazonas</option>
                  <option value='BA'>Bahia</option>
                  <option value='CE'>Ceará</option>
                  <option value='DF'>Distrito Federal</option>
                  <option value='ES'>Espírito Santo</option>
                  <option value='GO'>Goiás</option>
                  <option value='MA'>Maranhão</option>
                  <option value='MT'>Mato Grosso</option>
                  <option value='MS'>Mato Grosso do Sul</option>
                  <option value='MG'>Minas Gerais</option>
                  <option value='PA'>Pará</option>
                  <option value='PB'>Paraíba</option>
                  <option value='PR'>Paraná</option>
                  <option value='PE'>Pernambuco</option>
                  <option value='PI'>Piauí</option>
                  <option value='RJ'>Rio de Janeiro</option>
                  <option value='RN'>Rio Grande do Norte</option>
                  <option value='RS'>Rio Grande do Sul</option>
                  <option value='RO'>Rondônia</option>
                  <option value='RR'>Roraima</option>
                  <option value='SC'>Santa Catarina</option>
                  <option value='SP'>São Paulo</option>
                  <option value='SE'>Sergipe</option>
                  <option value='TO'>Tocantins</option>
                </select>
              </div>
            </div>

            <div className='mb-4'>
              <label htmlFor='address' className='block mb-2'>
                Endereço
              </label>
              <input
                name='address'
                id='address'
                type='text'
                placeholder='Digite o endereço'
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                className='bg-grey-border p-2 rounded-lg w-full'
              />
            </div>

            <div className='mb-8'>
              <label htmlFor='complement' className='block mb-2'>
                Complemento
              </label>
              <input
                name='complement'
                id='complement'
                type='text'
                placeholder='Digite o complemento'
                value={formData.complement}
                onChange={(e) => handleInputChange('complement', e.target.value)}
                className='bg-grey-border p-2 rounded-lg w-full'
              />
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'CONSULTANT' && (
          <div className='mb-8'>
            <h3 className='text-base font-semibold mb-4'>Selecionar Clientes</h3>
            <input
              type='text'
              placeholder='Buscar por nome ou email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='bg-grey-border p-2 rounded-lg w-full mb-4'
            />
            <div className='max-h-60 overflow-y-auto border border-grey-border rounded-lg p-4'>
              {filteredUsers.map((user: User) => (
                <div key={user.id} className='flex items-center mb-3'>
                  <input
                    type='checkbox'
                    id={`client-${user.id}`}
                    checked={selectedClients.includes(user.id)}
                    onChange={() => toggleClientSelection(user.id)}
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
        )}

        <div className='flex justify-center'>
          <button type='submit' className='bg-brand-green hover:bg-brand-green-hover hover:cursor-pointer text-brand-bright-green px-4 py-3 rounded-lg'>
            Criar Usuário
          </button>
        </div>
      </form>
    </main>
  );
}