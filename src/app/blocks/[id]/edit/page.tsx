import { notFound, redirect } from 'next/navigation';
import { findBlock, editBlock } from '@/actions/dbServices';
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

  return (
    <EditForm
      id={id}
      initialTitle={block.title}
      initialCode={block.code}
      />
  );
}
