import { useState } from 'react';
import { validateEmail, validateCPF, validatePhone, validateCEP } from '@/utils/validators';

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
  const [errors, setErrors] = useState<Partial<FormData & { cpf: string }>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: keyof FormData | 'cpf', value: string) => {
    let error = '';
    
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) error = 'Email inválido';
        break;
      case 'phone':
        if (value && !validatePhone(value)) error = 'Telefone deve ter 10 ou 11 dígitos';
        break;
      case 'cep':
        if (value && !validateCEP(value)) error = 'CEP deve ter 8 dígitos';
        break;
      case 'cpf':
        if (value && !validateCPF(value)) error = 'CPF deve ter 11 dígitos';
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateCpfField = (value: string) => {
    validateField('cpf', value);
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const requiredFields = [formData.name, formData.email, formData.phone, cpf];
    const hasEmptyRequired = requiredFields.some(field => !field.trim());
    return !hasErrors && !hasEmptyRequired;
  };

  const handleSubmit = async (selectedClients: string[]) => {
    if (!isFormValid()) {
      alert('Por favor, corrija os erros no formulário antes de continuar.');
      return;
    }

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
    handleSubmit,
    errors,
    validateCpfField,
    isFormValid
  };
};