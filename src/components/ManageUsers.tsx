'use client'

import React, { useState, useTransition } from 'react'
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

    const handleDelete = (userId: string) => {
        startTransition(async () => {
            const { success } = await removeUserFromDoc(room.id, userId);

            if (success) {
                toast.success('User removed from the room successfully')
            } else {
                toast.error('Failed to remove user from the room, try again')
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Users with access</DialogTitle>
                    <DialogDescription>
                        Below is the list of users who has access to this document
                    </DialogDescription>
                </DialogHeader>

                <hr className='my-2' />

                <div className='flex flex-col space-y-3'>
                    {usersInRoom?.docs.map((doc) => (
                        <div
                            key={doc.data().userId}
                            className='flex items-center justify-between gap-3'
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">
                                    {doc.data().userId === user?.emailAddresses[0].toString()
                                        ? `You (${doc.data().userId})` 
                                        : doc.data().userId 
                                    }
                                </p>
                            </div>

                            <div className='flex items-center gap-2 flex-shrink-0'>
                                <Button 
                                    disabled 
                                    variant='outline' 
                                    size="sm"
                                    className="text-sm "
                                >
                                    {doc.data().role || 'Editor'}
                                </Button>

                                {isOwner && doc.data().userId !== user?.emailAddresses[0].toString() && (
                                    <Button 
                                        size='sm' 
                                        variant='destructive' 
                                        onClick={() => handleDelete(doc.data().userId)} 
                                        disabled={isPending}
                                        className="min-w-[80px] h-8"
                                    >
                                        {isPending ? (
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-xs">Removing</span>
                                            </div>
                                        ) : (
                                            "Remove"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ManageUsers