import { notFound } from 'next/navigation';
import { findBlock } from '@/actions/dbServices';

import EditForm from './EditForm';

type Params = Promise<{ id: string }>;

export default async function EditBlockPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
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
