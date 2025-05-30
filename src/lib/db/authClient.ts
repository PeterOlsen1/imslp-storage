import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User, signInWithPopup, type UserCredential } from "firebase/auth";
import { app } from ".";
import { GoogleAuthProvider } from "firebase/auth";

export default class AuthClient {
    private auth = getAuth(app);

    login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    loginWithGoogle(): Promise<UserCredential> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }

    logout() {
        return signOut(this.auth);
    }

    getUser(): User | null {
        const user = this.auth.currentUser;
        return user;
    }

    async awaitUser(): Promise<User | null> {
        return new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    }

    onAuthChange(callback: (user: any) => void) {
        return onAuthStateChanged(this.auth, callback);
    }
}
