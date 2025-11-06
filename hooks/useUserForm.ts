import { useState } from 'react';

export interface FormData {
  name: string;
  phone: string;
  email: string;
  age: string;
  cep: string;
  state: string;
  address: string;
  complement: string;
}

export const useUserForm = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('USER');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    age: '',
    cep: '',
    state: '',
    address: '',
    complement: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (selectedClients: string[]) => {
    const userData = {
      type: userType,
      ...formData,
      cpf,
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

  return {
    cpf,
    setCpf,
    userType,
    setUserType,
    formData,
    handleInputChange,
    handleSubmit
  };
};