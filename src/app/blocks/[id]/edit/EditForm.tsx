'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Modal from 'react-modal';

import { editBlock } from '@/actions/dbServices';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/CodeEditor';

Modal.setAppElement('#root');

type EditFormProps = {
  id: string;
  initialTitle: string;
  initialCode: string;
};

export default function EditForm({ id, initialTitle, initialCode }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [code, setCode] = useState(initialCode);
  const [showModal, setShowModal] = useState(false);

  const saveToDatabase = async (title: string, code: string) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('code', code);
    await editBlock(parseInt(id), formData);
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    await saveToDatabase(newTitle, code);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleAutoSave = async (newCode: string) => {
    await saveToDatabase(title, newCode);
  };

  const handleSubmit = async (formData: FormData) => {
    formData.set('code', code);
    await editBlock(parseInt(id), formData);
    redirect(`/blocks/${id}`);
  };

  const handleReset = async () => {
    setTitle(initialTitle);
    setCode(initialCode);
    setShowModal(false);
    await saveToDatabase(initialTitle, initialCode);
    redirect(`/blocks/${id}`);
  };

  return (
    <div className='flex flex-col gap-6'>
      <h3 className='text-xl font-bold'>Edit Block</h3>

      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
        ℹ️ This editor features auto-save functionality. Your changes are automatically saved as you type.
      </p>

      <form action={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12'>Title</label>
          <input
            name='title'
            value={title}
            onChange={handleTitleChange}
            className='p-2 border rounded w-full'
            id='title'
            required
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-12'>Code</label>
          <div className='w-full h-[400px] border rounded'>
            <input type="hidden" name="code" value={code} />
            <CodeEditor
              existingCode={code}
              onChange={handleCodeChange}
              onAutoSave={handleAutoSave}
            />
          </div>
        </div>

        <div className='flex gap-4'>
          <Link href={`/blocks/${id}`}>
            <Button type="button" variant='outline'>Back</Button>
          </Link>
          <Button 
            type="button"
            variant='destructive' 
            onClick={() => setShowModal(true)}
          >
            Reset Changes
          </Button>
        </div>
      </form>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg'
        overlayClassName='fixed inset-0'
        style={{
          overlay: {
            backgroundColor: 'rgba(243, 244, 246, 0.75)'
          }          
        }}
      >
        <h2 className='text-xl font-bold mb-4'>Confirm Reset</h2>
        <p className='mb-6'>Are you sure you want to reset all changes?</p>
        <div className='flex justify-end gap-4'>
          <Button onClick={handleReset} variant='destructive'>
            Reset
          </Button>
          <Button variant='outline' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
