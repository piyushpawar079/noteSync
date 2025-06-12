'use server'

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

interface User {
  email: string;
  fullName: string;
}

export default async function filterUsers(allUsers: User[], roomId: string){

    await auth.protect();

    const query = await adminDB
        .collectionGroup("rooms")
        .where('roomId', "==", roomId)
        .get();

    let invitedUsers: string[] = []

    const newQuery = query.docs.map((user) => user.data())


    newQuery.map((user) => invitedUsers.push(user.userId))


    const finalUsers = allUsers.filter(user => !invitedUsers.includes(user.email))

    return finalUsers;

}