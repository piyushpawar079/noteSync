import React from 'react'
import NewDocumentButton from './NewDocumentButton'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'

const Sidebar = () => {

    const menuOptions = (
        <div>
            <NewDocumentButton />
        </div>
    );

  return (
    <div className='p-2 md:p-5 relative bg-gray-200'>

        <div className='md:hidden'>
            <Sheet >
            <SheetTrigger>
                <MenuIcon className='p-2 hover:opacity-30 rounded-lg' size={40} />
            </SheetTrigger>
            <SheetContent side='left' className='text-center'>
                <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div>
                    {menuOptions}
                </div>
                </SheetHeader>
            </SheetContent>
            </Sheet>
        </div>
        
        <div className='hidden md:inline'>
            {menuOptions}
        </div>
    </div>
  )
}

export default Sidebar