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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from 'react-markdown'

type Languages = 
    | 'english'
    | 'spanish'
    | 'portuguese'
    | 'frensh'
    | 'german'
    | 'chinese'
    | 'arabic'
    | 'hindi'
    | 'russian'
    | 'japanese'
    | 'marathi'
;

const langauges: Languages[] = [
    'english',
    'spanish',
    'portuguese',
    'frensh',
    'german',
    'chinese',
    'arabic',
    'hindi',
    'russian',
    'japanese',
    'marathi'
];

const TranslateDocument = ({ doc } : { doc: Y.Doc }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [langauge, setLangauge] = useState("");
    const [question, setQuestion] = useState('');
    const [summary, setSummary] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion = (e: FormEvent) => {
        e.preventDefault()

        startTransition( async () => {
            const documentData = doc.get('document-store').toJSON()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: langauge
                    })
                }
            );


            if (res.ok) {

                const { translated_text } = await res.json();

                setSummary(translated_text);
                console.log(translated_text);
                toast.success('Translated summary successfully')
            }

        })

    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant='outline'>
          <DialogTrigger>
              <LanguagesIcon />
              Translate
          </DialogTrigger>
      </Button>
      <DialogContent>
          <DialogHeader>
          <DialogTitle>Translate the document</DialogTitle>
          <DialogDescription>
              Select the langauge and AI will generate the summary of the doucment in selected langauge 
          </DialogDescription>

            <hr className='mt-5' />

            {
                question && <p className='mt-5 text-gray-500'>{question}</p>
            }

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
            <Select
                value={langauge}
                onValueChange={(value) => setLangauge(value)}
            >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                {
                    langauges.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                    ))
                }
            </SelectContent>
            </Select>
            <Button type='submit' disabled={!langauge || isPending}>
                {
                    isPending ? "Translating.." : "Translate"
                }
            </Button>
          </form>

      </DialogContent>
      </Dialog>
  )
}

export default TranslateDocument