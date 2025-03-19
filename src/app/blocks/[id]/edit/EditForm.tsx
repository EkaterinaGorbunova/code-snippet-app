'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';
import Editor from '@monaco-editor/react';
import { editBlock } from '@/actions/dbServices';
import { Button } from '@/components/ui/button';

Modal.setAppElement('#root');

interface EditFormProps {
  id: string;
  initialTitle: string;
  initialCode: string;
}

export default function EditForm({
  id,
  initialTitle,
  initialCode,
}: EditFormProps) {
  const [code, setCode] = useState(initialCode);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('code', code);
    setFormData(data);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      await editBlock(parseInt(id), formData);
      setShowModal(false);
    }
  };

  return (
    <>
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
            <div className='w-full h-[400px] border rounded'>
              <Editor
                height='100%'
                defaultLanguage='javascript'
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <Button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white'
            >
              Update
            </Button>
            <Link href={`/blocks/${id}`}>
              <Button variant='outline'>Cancel</Button>
            </Link>
          </div>
        </div>
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
        <h2 className='text-xl font-bold mb-4'>Confirm Update</h2>
        <p className='mb-6'>Are you sure you want to update this code block?</p>
        <div className='flex justify-end gap-4'>
          <Button
            onClick={handleConfirm}
            className='bg-blue-500 hover:bg-blue-600 text-white'
          >
            Update
          </Button>
          <Button variant='outline' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
