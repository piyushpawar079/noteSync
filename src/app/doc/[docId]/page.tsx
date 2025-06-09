'use client'

import Document from "@/components/Document"
import { useParams } from "next/navigation"


const DocumentPage = () => {

  const params = useParams()
  const docId = params.docId // This will contain your docId from the URL

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={docId! as string}/>
    </div>
  )
}

export default DocumentPage