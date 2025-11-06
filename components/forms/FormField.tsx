interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  error?: string;
  mask?: (value: string) => string;
}

export default function FormField({ 
  label, name, type = 'text', placeholder, value, onChange, required, options, error, mask 
}: FormFieldProps) {
  const baseClasses = `bg-grey-border p-2 rounded-lg w-full ${error ? 'border-2 border-red-500' : ''}`;
  
  const handleChange = (newValue: string) => {
    const maskedValue = mask ? mask(newValue) : newValue;
    onChange(maskedValue);
  };

  return (
    <div>
      <label htmlFor={name} className='block mb-2'>
        {label}
      </label>
      {options ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          className={baseClasses}
        >
          <option value=''>{placeholder || `Selecione ${label.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          className={baseClasses}
        />
      )}
      {error && (
        <p className='text-[#E84855] text-sm mt-1'>{error}</p>
      )}
    </div>
  );
}