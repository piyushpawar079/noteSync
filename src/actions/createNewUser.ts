'use server'

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export default async function createNewUser() {

    await auth.protect();
    
    const { sessionClaims } = await auth();

    const usersRef = await adminDB.collection('users').doc(sessionClaims?.email!);

    const userRef = await usersRef.set({
        fullName: sessionClaims?.fullName,
        email: sessionClaims?.email,
    });

}