import { useState } from 'react';
import { validateEmail, validatePhone, validateCEP } from '@/utils/validators';

interface FormData {
  name: string;
  phone: string;
  email: string;
  age: string;
  cep: string;
  state: string;
  address: string;
  complement: string;
}

export const useEditFormValidation = () => {
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateField = (field: keyof FormData, value: string) => {
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
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = (formData: FormData) => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const requiredFields = [formData.name, formData.email, formData.phone];
    const hasEmptyRequired = requiredFields.some(field => !field.trim());
    return !hasErrors && !hasEmptyRequired;
  };

  return {
    errors,
    validateField,
    isFormValid
  };
};