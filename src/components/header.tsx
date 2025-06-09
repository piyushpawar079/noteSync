'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';

const Header = () => {

    const { user } = useUser();
    
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