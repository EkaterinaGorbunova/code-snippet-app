'use client';

import { Button } from '@/components/ui/button';

interface DeleteFormProps {
  onDelete: () => Promise<void>;
}

export default function DeleteForm({ onDelete }: DeleteFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this block?')) {
      await onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="destructive" type='submit'>
        Delete
      </Button>
    </form>
  );
}
