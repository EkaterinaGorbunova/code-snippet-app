'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@/components/ui/button';

Modal.setAppElement('#root');

interface DeleteFormProps {
  onDelete: () => Promise<void>;
}

export default function DeleteForm({ onDelete }: DeleteFormProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    await onDelete();
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button variant='destructive' type='submit'>
          Delete
        </Button>
      </form>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 p-6 rounded-lg shadow-lg min-w-fit'
        overlayClassName='fixed inset-0 bg-transparent'
        style={{
          content: {
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      >
        <h2 className='text-xl font-bold mb-4'>Confirm Deletion</h2>
        <p className='mb-6'>Are you sure you want to delete this code block?</p>
        <div className='flex justify-end gap-4'>
          <Button onClick={handleConfirm} variant='destructive'>
            Delete
          </Button>
          <Button variant='outline' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
