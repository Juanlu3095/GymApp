import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root',
})
export class firesbaseService {
  

  constructor() {}

  firebaseConfig = {
    apiKey: "AIzaSyCi2_i1cp-9cs2yWMLpXLXrUYRWUJyons8",
    authDomain: "agenda-9b9ad.firebaseapp.com",
    projectId: "agenda-9b9ad",
    storageBucket: "agenda-9b9ad.appspot.com",
    messagingSenderId: "143287622689",
    appId: "1:143287622689:web:db0fc0b18418a93b425760",
    measurementId: "G-DMNYSJS9LC"
  };
  
  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  db = getFirestore(this.app);

  ngOnInit(): void {
    
  }
}