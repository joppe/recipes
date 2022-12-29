import { useForm } from '../context/useForm';

export const Notification = () => {
  const { errors } = useForm();
  const fieldNames = Object.keys(errors);

  console.log(errors);

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
};
