'use server'

import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export default async function deleteDocument(roomId: string){

    await auth.protect()

    try {
        
        await adminDB.collection('documents').doc(roomId).delete();

        const query = await adminDB
            .collectionGroup("rooms")
            .where('roomId', "==", roomId)
            .get();

        const batch = adminDB.batch();

        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        })

        await batch.commit()

        await liveblocks.deleteRoom(roomId);

        return { success: true };


    } catch (error) {
        console.log(error);
        return { success: false }
    }

}