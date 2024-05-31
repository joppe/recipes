import { Instruction } from '@/db/schema';

type InstructionsProps = {
  instructions: Instruction[] | undefined;
};

export function Instructions({ instructions }: InstructionsProps) {
  if (instructions === undefined || instructions.length === 0) {
    return <p>No instructions</p>;
  }

  return (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {instructions.map((instruction) => (
        <li key={instruction.id}>{instruction.description}</li>
      ))}
    </ol>
  );
}
