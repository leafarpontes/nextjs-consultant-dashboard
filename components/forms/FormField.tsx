interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export default function FormField({ 
  label, name, type = 'text', placeholder, value, onChange, required, options 
}: FormFieldProps) {
  const baseClasses = 'bg-grey-border p-2 rounded-lg w-full';

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
          onChange={(e) => onChange(e.target.value)}
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
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}