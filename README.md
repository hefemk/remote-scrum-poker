# remote-scrum-poker

## Initialize Firebase
Create `/firebase-config.json` which includes any parameters needed by Firebase. For more information: [Learn about the Firebase config object](https://firebase.google.com/docs/web/setup?hl=en#config-object).

For example:

```typescript
export const firebaseConfig = {
    "apiKey": "AIzaSyC6HC1j00G9pU0dcW5vjgOfwb_Vopj5TT4",
    "authDomain": "your-firebaseapp-domain.com",
    "databaseURL": "https://your-firebaseapp-domain-default-rtdb.firebaseio.com",
    "projectId": "your-project-id",
    "storageBucket": "your-project-id.appspot.com",
    "messagingSenderId": "633655287381",
    "appId": "1:633655287381:web:a2c649dbac123159a9257",
    "measurementId": "G-C5R2BS0EA3"
}
```

