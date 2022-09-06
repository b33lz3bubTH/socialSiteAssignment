import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import API from "./api";
import { toast } from 'react-toastify';


export const persistToLocal = (stateOfData) => {
    localStorage.setItem('LOGIN_DATA', JSON.stringify(stateOfData));
}
const authSubject = new Subject(null);



const defaultState = { name: '', email: '', isLoggedIn: false, friendList: [], profilePictureMedia: '' };


export const authStore = {
    init: () => authSubject.next({ ...defaultState }),
    subscribe: (setState => authSubject.subscribe(setState)),
    signIn: async ({ email, friendList, name, profilePictureMedia }) => {
        const loginData = {
            email, friendList, name, profilePictureMedia, isLoggedIn: true
        }
        authSubject.next(loginData);
        persistToLocal(loginData);
    },
    updateProfile: async ({ name, profilePictureMedia }) => {
        const sessionValue = localStorage.getItem("LOGIN_DATA");
        if (sessionValue) {
            const sessionData = JSON.parse(sessionValue);
            const data = { ...sessionData, name, profilePictureMedia };
            authSubject.next(data);
            persistToLocal(data);

        }
    },
    resume: () => {
        console.log("CHECKING FOR PERSISTANCE");
        const sessionValue = localStorage.getItem("LOGIN_DATA");
        if (sessionValue) {
            const sessionData = JSON.parse(sessionValue);
            authSubject.next(sessionData);
        }
    },
    logout: () => {
        authSubject.next({ ...defaultState });
        persistToLocal({});
    }
}
