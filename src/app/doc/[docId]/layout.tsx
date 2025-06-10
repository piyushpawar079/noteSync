import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { useParams } from 'next/navigation'
import CustomRoomProvider from '@/components/CustomRoomProvider'

const DocLayout = async ({ children } : {
    children: React.ReactNode
}) => {

    await auth.protect()

    const { id } = useParams();

  return (
    <CustomRoomProvider roomId={id! as string}>{children}</CustomRoomProvider>
  )
}

export default DocLayout