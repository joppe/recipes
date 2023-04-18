import { useForm } from '../context/useForm';

export function Notification(): JSX.Element | null {
  const { errors } = useForm();
  const fieldNames = Object.keys(errors);

  if (fieldNames.length === 0) {
    return null;
  }

  return (
    <div className="text-red-600">
      {fieldNames.map((fieldName) => (
        <p key={fieldName}>
          {fieldName} {errors[fieldName]}
        </p>
      ))}
    </div>
  );
}
