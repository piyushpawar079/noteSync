'use client'

// import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { useParams } from 'next/navigation'
import CustomRoomProvider from '@/components/CustomRoomProvider'

const DocLayout = ({ children } : {
    children: React.ReactNode
}) => {

    // await auth.protect()

    const { docId } = useParams();


  return (
    <CustomRoomProvider roomId={docId! as string}>{children}</CustomRoomProvider>
  )
}

export default DocLayout