'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import inviteUserToDocument from '@/actions/inviteUser'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import filterUsers from '@/actions/filterUsers'

// Define the User type
interface User {
  email: string;
  fullName: string;
}

const InviteUsers = () => {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    // Initialize with proper type and empty array
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const { user } = useUser();
    const currentUserEmail = user?.emailAddresses[0].emailAddress;
    const roomId = path.split('/').pop();

    const handleInvite = (email: string) => {

        if (!roomId) {
            return;
        }

        startTransition(async () => {
            const { success } = await inviteUserToDocument(roomId, email);

            if (success) {
                toast.success('User added to room successfully')
            } else {
                toast.error('Failed to add user to the room, try again')
            }
        })
    }

    useEffect(() => {
        const getUsers = async () => {
            const usersCollection = collection(db, 'users');
            const res = await getDocs(usersCollection);

            // Type assertion to ensure the data matches User interface
            const newRes = res.docs.map(doc => doc.data() as User);
            
            // Filter out current user
            const filteredUsers = newRes.filter(user => user.email !== currentUserEmail);
            
            
            // Apply additional filtering if needed
            const newAllUsers = await filterUsers(filteredUsers, roomId as string);
            setAllUsers(newAllUsers);
        } 

        if (isOpen) {
            getUsers();
        }
    }, [isOpen, currentUserEmail, handleInvite])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline'>
                <DialogTrigger>
                    Invite
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite the user to collaborate</DialogTitle>
                    <DialogDescription>
                        List of users you can invite
                    </DialogDescription>
                </DialogHeader>
                {allUsers.length > 0 ? (
                    allUsers.map((user) => (
                        <div key={user.email} className='flex justify-between'>
                            <p>{user.fullName}</p>
                            <Button onClick={() => handleInvite(user.email)}>
                                { isPending ? "Inviting.." : "Invite"}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No users available to invite</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default InviteUsers