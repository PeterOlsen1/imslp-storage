import { getFirestore, collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { app } from ".";
import type { User } from "firebase/auth";

export default class DbClient {
    private db = getFirestore(app);
    private users = collection(this.db, "users");

    getDb() {
        return this.db;
    }

    async createUser(user: User) {
        const uid = user.uid;
        const userData = {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            updatedAt: new Date(),
            uid: uid,
            sheets: []
        };

        const userDoc = await getDoc(doc(this.users, uid));
        if (userDoc.exists()) {
            console.log("user already exists!!");
            return;
        }
        return setDoc(doc(this.users, uid), userData);
    }

    async getUserData(uid: string): Promise<any | null> {
        const docSnapshot = await getDoc(doc(this.users, uid));
        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            return null;
        }
    }

    async addSheetToUser(uid: string, title: string, url: string) {
        if (!uid || !title || !url) {
            throw new Error("Invalid parameters: uid, title, and url are required");
        }

        const userDoc = doc(this.users, uid);
        const userSnapshot = await getDoc(userDoc);
        
        if (!userSnapshot.exists()) {
            throw new Error("User does not exist");
        }

        const userData = userSnapshot.data();
        const sheets = userData.sheets || [];
        
        const newSheet = {
            title: title,
            url: url,
        };

        sheets.push(newSheet);
        return setDoc(userDoc, { sheets }, { merge: true });
    }

    async deleteSheetFromUser(uid: string, sheetTitle: string) {
        const userDoc = doc(this.users, uid);
        const userSnapshot = await getDoc(userDoc);
        
        if (!userSnapshot.exists()) {
            throw new Error("User does not exist");
        }

        const userData = userSnapshot.data();
        const sheets = userData.sheets || [];
        
        const updatedSheets = sheets.filter((sheet: any) => sheet.title !== sheetTitle);
        
        return setDoc(userDoc, { sheets: updatedSheets }, { merge: true });
    }
}