'use server'

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"

export default async function createNewDocument() {
    
    await auth.protect();


    const { sessionClaims } = await auth();

    const docCollectionRef = await adminDB.collection('documents');

    const docRef = await docCollectionRef.add({
        title: "New document"
    });

    await adminDB.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        role: 'owner',
        createdAt: new Date(),
        roomId: docRef.id
    })

    return {
        docId: docRef.id
    }

}