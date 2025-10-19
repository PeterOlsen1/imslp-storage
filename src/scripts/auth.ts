import { GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';

export async function signInWithGoogle(auth: Auth) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
}