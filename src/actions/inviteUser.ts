'use server'

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export default async function inviteUserToDocument(roomId: string, email: string){

    await auth.protect()

    try {
        
        await adminDB
            .collection('users')
            .doc(email)
            .collection('rooms')
            .doc(roomId)
            .set({
                userId: email,
                role: 'editor',
                createdAt: new Date(),
                roomId
            });
        
            return { success: true }

    } catch (error) {
        console.log(error)
        return { success : false }
    }

}