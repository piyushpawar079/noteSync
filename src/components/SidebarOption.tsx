import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const SidebarOption = ({href, id} : {
    href: string,
    id: string
}) => {

    const [data] = useDocumentData(doc(db, 'documents', id));

    const pathName = usePathname();

    const isActive = href.includes(pathName) && pathName != "/";

    if (!data) {
        return null;
    }

  return (
    <Link href={href} className={`border p-2 rounded-md text-black ${
        isActive ? "bg-gray-400 font-semibold border-black" : "bg-gray-300"
    }`}>
        <p className='truncate'>{data.title}</p>
    </Link>
  )
}

export default SidebarOption