'use client'

import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePathname, useRouter } from 'next/navigation'
import deleteDocument from '@/actions/deleteDocument'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'

const DeleteDocument = () => {

    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        const roomId = path.split('/').pop();

        if (!roomId) {
            return;
        }

        startTransition( async () => {

            const { success } = await deleteDocument(roomId);

            if (success) {
                router.replace('/')
                toast.success('Document deleted successfully')
            } else {
                toast.error('Failed to delete the document, try again')
            }

        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='destructive'>
        <DialogTrigger>
            Delete
        </DialogTrigger>
    </Button>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you absolutely sure you want to delete this document</DialogTitle>
        <DialogDescription>
            This will delete the document and its content, and remove all the users from the room.
        </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-end gap-2'>
            <Button variant='destructive' onClick={handleDelete} disabled={isPending} >
                {
                    isPending ? "Deleting..." : "Delete"
                }
            </Button>
            <DialogClose asChild>
                <Button type='button' variant='secondary' disabled={isPending}>
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default DeleteDocument