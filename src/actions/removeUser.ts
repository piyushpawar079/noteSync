'use server'

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export default async function removeUserFromDoc(roomId: string, userId: string){

    await auth.protect();

    try {
        
        await adminDB
            .collection('users')
            .doc(userId)
            .collection('rooms')
            .doc(roomId)
            .delete();

        return { success : true }

    } catch (error) {
        console.log(error)
        return { success: false}
    }

}