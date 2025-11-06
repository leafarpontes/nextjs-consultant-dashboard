import FormField from './FormField';
import { formatCpf, formatPhone, formatCEP } from '@/utils/formatters';
import { BRAZILIAN_STATES } from '@/constants/states';
import { FormData } from '@/hooks/useUserForm';

interface BasicInfoTabProps {
  formData: FormData;
  cpf: string;
  onInputChange: (field: keyof FormData, value: string) => void;
  onCpfChange: (value: string) => void;
  errors: Partial<FormData & { cpf: string }>;
  onCpfValidate: (value: string) => void;
}

export default function BasicInfoTab({ formData, cpf, onInputChange, onCpfChange, errors, onCpfValidate }: BasicInfoTabProps) {
  const handleCpfChange = (value: string) => {
    const formatted = formatCpf(value);
    onCpfChange(formatted);
    onCpfValidate(formatted);
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
            className={`bg-grey-border p-2 rounded-lg w-full ${errors.cpf ? 'border-2 border-red-500' : ''}`}
          />
          {errors.cpf && (
            <p className='text-red-500 text-sm mt-1'>{errors.cpf}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-4'>
        <FormField
          label='CEP'
          name='cep'
          placeholder='00000-000'
          value={formData.cep}
          onChange={(value) => onInputChange('cep', value)}
          mask={formatCEP}
          error={errors.cep}
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