import {auth} from '../firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';

export const login= async(email: string, password: string): Promise<void> =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    }catch(error){
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signup = async(email:string, password: string): Promise<void> =>{
    try{
        await createUserWithEmailAndPassword(auth,email,password);

    }catch(error){
        console.error('Error signing up:',error);
        throw error;
    }
};

export const logout = async (): Promise<void> =>{
    try{
        await signOut(auth);

    }catch(error){
        console.error('Error logging out:',error);
        throw error;
    }
}

