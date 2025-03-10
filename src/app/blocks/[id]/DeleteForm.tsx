'use client';

interface DeleteFormProps {
  onDelete: () => Promise<void>;
}

export default function DeleteForm({ onDelete }: DeleteFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('Are you sure you want to delete this block?')) {
      e.preventDefault();
    }
  };

  return (
    // action={onSubmit} - Server Action that processes form data on the server side
    // onSubmit={handleSubmit} - Client-Side event handler that runs before form submission, used for confirmation dialogue
    <form action={onDelete} onSubmit={handleSubmit}>
      <button
        type='submit'
        className='px-3 py-1.5 w-fit p-2 border rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer'
      >
        Delete
      </button>
    </form>
  );
}