'use client'

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import createNewDocument from '@/actions/createNewDocument';

const NewDocumentButton = () => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {

    startTransition( async () => {

      const { docId } = await createNewDocument();

      router.push(`/doc/${docId}`)

    });

  }

  return (
    <Button onClick={handleCreate} disabled={isPending}>
      {
        isPending ? "Creating..." : "New Document"
      }
    </Button>
  )
}

export default NewDocumentButton