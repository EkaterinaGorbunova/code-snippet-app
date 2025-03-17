'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { editBlock } from '@/actions/dbServices';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EditFormProps {
  id: string;
  initialTitle: string;
  initialCode: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      type='submit'
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}

export default function EditForm({ id, initialTitle, initialCode }: EditFormProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormData(new FormData(form));
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      await editBlock(parseInt(id), formData);
    }
    setShowDialog(false);
  };

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update this block?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
