import FormField from './FormField';
import { formatCpf } from '@/utils/formatters';
import { BRAZILIAN_STATES } from '@/constants/states';
import { FormData } from '@/hooks/useUserForm';

interface BasicInfoTabProps {
  formData: FormData;
  cpf: string;
  onInputChange: (field: keyof FormData, value: string) => void;
  onCpfChange: (value: string) => void;
}

export default function BasicInfoTab({ formData, cpf, onInputChange, onCpfChange }: BasicInfoTabProps) {
  const handleCpfChange = (value: string) => {
    const formatted = formatCpf(value);
    onCpfChange(formatted);
  };

  return (
    <div>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <FormField
          label='Idade'
          name='age'
          type='number'
          value={formData.age}
          onChange={(value) => onInputChange('age', value)}
          required
        />
        <div>
          <label htmlFor='cpf' className='block mb-2'>CPF</label>
          <input
            name='cpf'
            id='cpf'
            type='text'
            placeholder='000.000.000-00'
            value={cpf}
            onChange={(e) => handleCpfChange(e.target.value)}
            className='bg-grey-border p-2 rounded-lg w-full'
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-4'>
        <FormField
          label='CEP'
          name='cep'
          placeholder='Insira o CEP'
          value={formData.cep}
          onChange={(value) => onInputChange('cep', value)}
          required
        />
        <FormField
          label='Estado'
          name='state'
          value={formData.state}
          onChange={(value) => onInputChange('state', value)}
          options={BRAZILIAN_STATES}
          placeholder='Selecione o estado'
          required
        />
      </div>

      <FormField
        label='Endereço'
        name='address'
        placeholder='Digite o endereço'
        value={formData.address}
        onChange={(value) => onInputChange('address', value)}
        required
      />

      <div className='mt-4'>
        <FormField
          label='Complemento'
          name='complement'
          placeholder='Digite o complemento'
          value={formData.complement}
          onChange={(value) => onInputChange('complement', value)}
        />
      </div>
    </div>
  );
}