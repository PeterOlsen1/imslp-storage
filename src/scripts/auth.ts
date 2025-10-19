import { GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { usersRef } from './firebase';

export async function signInWithGoogle(auth: Auth) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    try {
        await setDoc(doc(usersRef, user.uid), {
            uid: user.uid,
            email: user.email ?? null,
            displayName: user.displayName ?? null,
            photoURL: user.photoURL ?? null,
            lastLogin: Date.now(),
        });
    } catch (err) {
        console.error('Failed to insert user into usersRef', err);
    }

    return user;
}