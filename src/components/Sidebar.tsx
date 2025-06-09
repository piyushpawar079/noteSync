'use client'

import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import { collection, collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { useCollection } from "react-firebase-hooks/firestore"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import SidebarOption from './SidebarOption'

interface RoomDocument extends DocumentData{
    userId: string;
    role: 'owner' | 'editor';
    createdAt: Date;
    roomId: string;
}

const Sidebar = () => {

    const { user } = useUser();

    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[],
        editor: RoomDocument[]
    }>({
        owner: [],
        editor: []
    });

    const [data, loading, error] = useCollection(
        (
            user &&
            query(
                collectionGroup(db, 'rooms'),
                where('userId', '==', user.emailAddresses[0].toString())
            )
        )
    );


    useEffect(() => {
    
        if (!data) {
            return;
        }

        const groupedData = data.docs.reduce<{
            owner: RoomDocument[],
            editor: RoomDocument[]
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;

                if (roomData.role === 'owner') {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData
                    })
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData
                    })
                }
                return acc;
            },
            {
                owner: [],
                editor: []
            }
        )

        setGroupedData(groupedData);
    
    }, [data])
    

    const menuOptions = (
        <div>
            <NewDocumentButton />

            <div className='flex py-4 space-y-4 flex-col md:max-w-36'> 
                {
                groupedData.owner.length === 0 ? (
                    <h2 className='text-gray-500 font-semibold text-sm'>No documents found</h2>
                ) : (
                    <>
                        <h2 className='text-gray-500 font-semibold text-sm'>My Documents</h2>
                        {
                            groupedData.owner.map((doc) => (
                                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                            ))
                        }
                    </>
                )
            }
            </div>

            <div>
                {
                    groupedData.editor.length > 0 && (
                        <>
                            <h2 className='text-gray-500 font-semibold text-sm'>Shared Documents</h2>
                            {
                                groupedData.editor.map((doc) => (
                                    <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                                ))
                            }
                        </>
                    )
                }
            </div>

        </div>
    );

  return (
    <div className='p-2 md:p-5 relative bg-gray-100'>

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