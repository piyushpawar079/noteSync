'use client'

import React, { FormEvent, useState, useTransition } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useRoom } from '@liveblocks/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { useOwner } from '@/lib/useOwner'
import removeUserFromDoc from '@/actions/removeUser'

const ManageUsers = () => {

    const room = useRoom();
    const { user } = useUser();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const isOwner = useOwner();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id))
    )

    const handleDelete =  (userId: string) => {

        startTransition( async () => {

            const { success } = await removeUserFromDoc(room.id, userId);

            if (success) {
                toast.success('User added to room successfully')
            } else {
                toast.error('Failed to add user to the room, try again')
            }

        })

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant='outline'>
            <DialogTrigger>
                Users ({usersInRoom?.docs.length})
            </DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Users with access</DialogTitle>
            <DialogDescription>
                Below is the list of users who has access to this document
            </DialogDescription>
            </DialogHeader>

        <hr className='my-2' />

        <div className='flex flex-col space-y-2 '>
            {
                usersInRoom?.docs.map((doc) => (
                    <div
                        key={doc.data().userId}
                        className='flex items-center justify-between '
                    >
                        <p>
                            {
                                doc.data().userId === user?.emailAddresses[0].toString()
                                    ? `You (${doc.data().userId})` : doc.data().userId 
                            }
                        </p>

                        <div className='gap-2 flex items-center'>
                            <Button disabled variant='outline'>{doc.data().userId}</Button>

                            {
                                isOwner &&
                                    doc.data().userId !== user?.emailAddresses[0].toString()
                                        && (
                                            <Button size='sm' variant='destructive' onClick={() => handleDelete(doc.data().userId)} disabled={isPending}>
                                                {
                                                    isPending ? "Removing..." : "X"
                                                }
                                            </Button>
                                        )
                            }

                        </div>
                    </div>
                ))
            }
        </div>

        </DialogContent>
        </Dialog>
    )
}

export default ManageUsers