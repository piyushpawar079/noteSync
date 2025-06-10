'use client'

import { useOthers, useSelf } from '@liveblocks/react/suspense'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Avatars = () => {

    const self = useSelf();
    const others = useOthers();

    const all = [self, ...others];

  return (
    <div className='flex gap-2 items-center'>
        <p className='font-light text-sm'>
            Users currently editing this page
        </p>
        <div className='flex -space-x-5 '>
            {
                all.map((user, idx) => (
                    <Tooltip key={user.id + idx}>
                    <TooltipTrigger>
                        <Avatar className='border-2 hover:z-50'>
                        <AvatarImage src={user.info.avatar} />
                        <AvatarFallback>{user?.info.name}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{self.id === user.id ? "You" : user?.info.name}</p>
                    </TooltipContent>
                    </Tooltip>
                ))
            }
        </div>
    </div>
  )
}

export default Avatars