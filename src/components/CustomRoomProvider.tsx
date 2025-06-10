import React from 'react'
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import LoadingSpinner from './LoadingSpinner'
import LiveCursorProvider from './LiveCursorProvider'

const CustomRoomProvider = ({ children, roomId } : {
    children: React.ReactNode,
    roomId: string
}) => {
  return (
    <RoomProvider
       id={roomId}
       initialPresence={{ cursor: null }} 
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>
          {children}
        </LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CustomRoomProvider