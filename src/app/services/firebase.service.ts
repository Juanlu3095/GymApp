import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root',
})
export class firebaseService {
  

  constructor() {}

  public firebaseConfig = {
    apiKey: "AIzaSyCi2_i1cp-9cs2yWMLpXLXrUYRWUJyons8",
    authDomain: "agenda-9b9ad.firebaseapp.com",
    projectId: "agenda-9b9ad",
    storageBucket: "agenda-9b9ad.appspot.com",
    messagingSenderId: "143287622689",
    appId: "1:143287622689:web:db0fc0b18418a93b425760",
    measurementId: "G-DMNYSJS9LC"
  };
  
  // Initialize Firebase
  public app = initializeApp(this.firebaseConfig);
  public analytics = getAnalytics(this.app);
  public db = getFirestore(this.app);

  ngOnInit(): void {
    
  }
  
}