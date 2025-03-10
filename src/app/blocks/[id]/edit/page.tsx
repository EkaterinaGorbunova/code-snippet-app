import { notFound, redirect } from 'next/navigation';
import { findBlock, editBlock } from '@/db';
import EditForm from './EditForm';

interface EditBlockPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlockPage({ params }: EditBlockPageProps) {
  const { id } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
  const block = await findBlock(parseInt(id));

  if (!block) {
    return notFound();
  }

  async function handleEdit(formData: FormData) {
    'use server';
    const title = formData.get('title')?.toString().trim() || '';
    const code = formData.get('code')?.toString().trim() || '';

    if (!title || !code) return;

    await editBlock(parseInt(id), title, code);
    redirect(`/blocks/${id}`);
  }

  return (
    <EditForm
      id={id}
      initialTitle={block.title}
      initialCode={block.code}
      onEdit={handleEdit}
    />
  );
}
