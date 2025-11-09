import { collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { usersRef } from './firebase'
import type { Sheet } from '@/types/sheet'

export function getUserSheetsCollection(userId: string) {
  if (!userId) {
    return null
  }
  return collection(usersRef, userId, 'sheets')
}

export async function addUserSheet(userId: string, sheetData: Sheet) {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return null
  }

  if (!sheetData.composer || !sheetData.title || !sheetData.url) {
    console.error('Missing data!')
    return null
  }

  try {
    const docRef = await addDoc(userSheetsRef, {
      ...sheetData,
      lastAccessed: new Date(),
    })
    return docRef
  } catch (e) {
    console.error('Error adding document: ', e)
    return null
  }
}

export async function getUserSheets(userId: string): Promise<Sheet[] | null> {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return null
  }

  const out: Sheet[] = []
  const docs = await getDocs(userSheetsRef)
  docs.forEach((d) => {
    console.log(d)
  })

  return out
}

export async function updateSheet(userId: string, sheetId: string, data: Sheet) {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return false
  }

  const docRef = doc(userSheetsRef, sheetId)
  try {
    await setDoc(docRef, {
      ...data,
    })
    return true
  } catch {
    console.error('Error setting last accessed time!')
    return false
  }
}

export async function deleteSheet(userId: string, sheetId: string) {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return false
  }

  const docRef = doc(userSheetsRef, sheetId)
  return deleteDoc(docRef)
}

export async function updateRecentlyViewed(userId: string, sheetId: string) {
  const userSheetsRef = getUserSheetsCollection(userId)
  if (!userSheetsRef) {
    return null
  }

  const docRef = doc(userSheetsRef, sheetId)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    const data = snapshot.data()
    try {
      await setDoc(docRef, {
        ...data,
        lastAccessed: new Date(),
      })
    } catch {
      console.error('Error setting last accessed time!')
    }
  } else {
    console.error('Error finding sheet document!')
  }
}
