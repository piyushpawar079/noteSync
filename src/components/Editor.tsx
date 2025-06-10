'use client'

import React, { useEffect, useState } from 'react'
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { useRoom, useSelf } from '@liveblocks/react';
import { BlockNoteView } from '@blocknote/shadcn'
import { BlockNoteEditor } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react'; 
import stringToColor from '@/lib/stringToColor';
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"

type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
}

const BlockNote = ({ doc, provider }: EditorProps) => {

    const userInfo = useSelf((me) => me.info);

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration:{
            provider,
            fragment: doc.getXmlFragment('document-store'),
            user: {
                name: userInfo?.name!,
                color: stringToColor(userInfo?.email!)
            }
        } 
    })

  return (
    <div className='relative max-w-6xl mx-auto'>
        <BlockNoteView 
            editor={editor}
            className='min-h-screen'
            theme='light'
        />
    </div>
  )
}



const Editor = () => {

    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();

    useEffect(() => {

        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        setProvider(yProvider);
        setDoc(yDoc);

        return () => {
            yDoc.destroy();
            yProvider.destroy();
        }

    }, [room])

    if (!doc || !provider) {
        return null;
    }

  return (
    <div className='max-w-6xl mx-auto'>

        <div className='flex mb-18 items-center justify-end gap-2'>

        </div>

        <BlockNote doc={doc} provider={provider}/>

    </div>
  )
}

export default Editor   