import React from 'react'
import app from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectID: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderID: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        console.log(config.databaseURL)
        this.db = app.database();
    }
    
    //API
    player = (team,pid) => this.db.ref(`teams/${team}/${pid}`);
    teams = () => this.db.ref('teams');
    pitchers = (team) => this.db.ref(`teams/${team}`);
    
}

export default Firebase;