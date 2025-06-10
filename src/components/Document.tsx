import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Button } from './ui/button';
import Editor from './Editor';

const Document = ({ id }: { id: string }) => {

    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const [title, setTitle] = useState('');
    const [isUpdating, startTransition] = useTransition();

    useEffect(() => {

        if (data) {
            setTitle(data.title)
        }

    }, [data])

    const changeTitle = (e: FormEvent) => {

        e.preventDefault();

        if (title.trim()) {
            startTransition( async () => {
                await updateDoc(doc(db, 'documents', id), {
                    title: title
                })
            })
        }

    }

  return (
    <div>
        <div className='flex max-w-6xl mx-auto justify-between pb-5'>
            <form className='flex flex-1 space-x-2' onSubmit={changeTitle}>
                <Input className='border-2 border-black' value={title} onChange={(e) => setTitle(e.target.value)}/>

                <Button disabled={isUpdating} type='submit'>
                    {
                        isUpdating ? 'Updating...' : 'Update'
                    }
                </Button>

            </form>
        </div>

        <div>

        </div>

        <hr className='pb-10' />

        <div>
            <Editor />
        </div>

    </div>
  )
}

export default Document