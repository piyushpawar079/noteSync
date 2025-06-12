'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import { useEffect } from 'react';
import createNewUser from '@/actions/createNewUser';

const Header = () => {

    const { user } = useUser();


    useEffect(() => {

      if (user) {
          createNewUser()
      }

    }, [user])

    
  return (
    <div className='flex items-center justify-between p-5'>
        {
          user &&
          <Link href={'/'}>
            <h1 className='text-2xl'>{user?.firstName}{`'s`} space</h1>
          </Link>
        }

        <Breadcrumbs />

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

    </div>
  )
}

export default Header