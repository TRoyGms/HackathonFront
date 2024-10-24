import Label from '../atoms/Label';
import Input from '../atoms/Input';
import SelectOption from '../atoms/SelectOption';
import TextAreaOption from '../atoms/TextAreaOption';

export default function Field({ label, type, name, value, onChange, options, required = false, className }) {
  return (
    <div className="mb-4">
      <Label text={label} htmlFor={name} className={className}/>
      {type === 'select' ? (
        <SelectOption name={name} value={value} onChange={onChange} options={options} required={required} className={className} />
      ) : type === 'textarea' ? (
        <TextAreaOption name={name} value={value} onChange={onChange} required={required} className={className} />
      ) : (
        <Input type={type} name={name} value={value} onChange={onChange} required={required} className={className} />
      )}
    </div>
  );
}