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
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from './ui/input'
import inviteUserToDocument from '@/actions/inviteUser'

const InviteUsers = () => {
    const [isPending, startTransition] = useTransition();
      const [isOpen, setIsOpen] = useState(false);
      const [email, setEmail] = useState('');
      const path = usePathname();
  
      const handleInvite = async (e: FormEvent) => {

        e.preventDefault();

        const roomId = path.split('/').pop();

        if (!roomId) {
            return;
        }

        startTransition( async () => {

            const { success } = await inviteUserToDocument(roomId, email);

            if (success) {
                setEmail('')
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
              Invite
          </DialogTrigger>
      </Button>
      <DialogContent>
          <DialogHeader>
          <DialogTitle>Invite the user to collaborate</DialogTitle>
          <DialogDescription>
              Enter the email of the user you want to invite
          </DialogDescription>
          </DialogHeader>
          
          <form className='flex gap-2' onSubmit={handleInvite}>
            <Input
                type='email'
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button type='submit' disabled={!email || isPending}>
                {
                    isPending ? "Inviting.." : "Invite"
                }
            </Button>
          </form>

      </DialogContent>
      </Dialog>
    )
}

export default InviteUsers