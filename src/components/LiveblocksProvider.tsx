
import React from 'react'

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const LiveBlocksProvider = ({ children } : {
    children: React.ReactNode
}) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY) {
        throw new Error('NEXT_PUBLIC_LIVEBLOCK_API_KEY is not set');
    }

  return <LiveblocksProvider authEndpoint={'/auth-endpoint'} throttle={16}>{children}</LiveblocksProvider>
}

export default LiveBlocksProvider

