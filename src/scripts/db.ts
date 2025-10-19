import { collection, addDoc, getDocs } from "firebase/firestore"
import { usersRef } from "./firebase"
import type { Sheet } from "@/types/sheet";

export function getUserSheetsCollection(userId: string) {
    return collection(usersRef, userId, "sheets");
}

export async function addUserSheet(userId: string, sheetData: Sheet) {
    const userSheetsRef = getUserSheetsCollection(userId);
    try {
        const docRef = await addDoc(userSheetsRef, sheetData);
        return docRef;
    }
    catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}

export async function getUserSheets(userId: string): Promise<Sheet[]> {
    const userSheetsRef = getUserSheetsCollection(userId);
    const out: Sheet[] = [];
    const docs = await getDocs(userSheetsRef);
    docs.forEach(d => {
        console.log(d);
    });

    return out;
}