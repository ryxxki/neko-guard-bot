import admin from 'firebase-admin'
require('dotenv').config
//es-lint disable until next line
const serviceAccount:admin.ServiceAccount = require("../../db.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://discord-ab7f5.firebaseio.com'
})
const db:FirebaseFirestore.Firestore = admin.firestore()
db.settings({timestampsInSnapshots: true})
export default db