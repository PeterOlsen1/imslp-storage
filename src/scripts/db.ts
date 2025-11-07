import { collection, addDoc, getDocs } from 'firebase/firestore'
import { usersRef } from './firebase'
import type { Sheet } from '@/types/sheet'

export function getUserSheetsCollection(userId: string) {
  if (!userId) {
    return null;
  }
  return collection(usersRef, userId, 'sheets')
}

export async function addUserSheet(userId: string, sheetData: Sheet) {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return null;
  }

  if (!sheetData.composer || sheetData.title || sheetData.url) {
    console.error("Missing data!");
    return null;
  }
  
  try {
    const docRef = await addDoc(userSheetsRef, sheetData)
    return docRef
  } catch (e) {
    console.error('Error adding document: ', e)
    return null
  }
}

export async function getUserSheets(userId: string): Promise<Sheet[]|null> {
  const userSheetsRef = getUserSheetsCollection(userId);
  if (!userSheetsRef) {
    return null;
  }

  const out: Sheet[] = []
  const docs = await getDocs(userSheetsRef)
  docs.forEach((d) => {
    console.log(d)
  })

  return out
}
