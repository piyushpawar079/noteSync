'use client'

import * as Y from 'yjs'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from 'react';
import { Input } from './ui/input';
import { BotIcon, MessageCircleCode } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from 'react-markdown'


const ChatToDocument = ({ doc } : { doc: Y.Doc }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [summary, setSummary] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion = (e: FormEvent) => {
        e.preventDefault()


        startTransition( async () => {
            const documentData = doc.get('document-store').toJSON()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        documentData,
                        question: input
                    })
                }
            );


            if (res.ok) {

                const { message } = await res.json();

                setSummary(message);
                console.log(message);
                setInput('');
                toast.success('Question asked successfully')
            }
            else{
                toast.error("Failed to ask question try again later.")
            }
        })

    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant='outline'>
          <DialogTrigger>
              <MessageCircleCode className='mr-2' />
              Chat to document
          </DialogTrigger>
      </Button>
      <DialogContent>
          <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription>
              Ask a question and chat with the document using AI
          </DialogDescription>

          </DialogHeader>

            {
                summary && (
                    <div className='flex flex-col items-start max-h-96 gap-5 p-5 overflow-y-scroll bg-gray-100'>
                        <div className='flex'>
                            <BotIcon className='w-10 flex-shrink-0' />
                            <p className='font-bold'>
                                GPT { isPending ? "is thinking..." : "Says: "}
                            </p>
                        </div>
                        <p>
                            { isPending ? "Thinking... " : <Markdown>{summary}</Markdown>}
                        </p>
                    </div>
                )
            }

          <form className='flex gap-2' onSubmit={handleAskQuestion}>
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='w-full'
                type='input'
                placeholder='i.e What is this document about?'
            />
            <Button type='submit' disabled={!input || isPending}>
                {
                    isPending ? "Asking.." : "Ask"
                }
            </Button>
          </form>

      </DialogContent>
      </Dialog>
  )
}

export default ChatToDocument