'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';

interface EditFormProps {
  id: string;
  initialTitle: string;
  initialCode: string;
  onEdit: (formData: FormData) => Promise<void>;
}

function SubmitButton() {
  // https://react.dev/reference/react-dom/hooks/useFormStatus
  const { pending } = useFormStatus();
  
  return (
    <button
      type='submit'
      disabled={pending}
      className='px-6 py-1.5 w-fit p-2 border rounded bg-blue-500 hover:bg-blue-600 text-white cursor-pointer disabled:bg-blue-300'
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  );
}

export default function EditForm({ id, initialTitle, initialCode, onEdit }: EditFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('Are you sure you want to UPDATE this block?')) {
      e.preventDefault();
      return;
    }
  };

  return (
    // action={onSubmit} - Server Action that processes form data on the server side
    // onSubmit={handleSubmit} - Client-Side event handler that runs before form submission, used for confirmation dialogue
    <form action={onEdit} onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold mb-4'>Edit Block</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12'>Title</label>
          <input
            name='title'
            className='p-2 border rounded w-full'
            id='title'
            defaultValue={initialTitle}
            required
          />
        </div>
        <div className='flex gap-4'>
          <label className='w-12'>Code</label>
          <textarea
            name='code'
            className='p-2 border rounded w-full'
            id='code'
            defaultValue={initialCode}
            rows={6}
            required
          />
        </div>

        <div className='flex gap-4'>
          <SubmitButton />

          <Link href={`/blocks/${id}`}>
            <button className='px-3 py-1.5 w-fit border rounded hover:bg-gray-200 text-black cursor-pointer'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
