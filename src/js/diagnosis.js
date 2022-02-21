
import { app, db } from "../configs/firebase";
import {collection, addDoc, getDocs, Timestamp} from '@firebase/firestore'


const diagnosisCollectionRef = db.collection("diagnosis")


export const getDiagnosis = async () => new Promise(async (resolve, reject) => {
    // const q = query(collection(db, diagnosisCollectionRef), where("capital", "==", true);
    let diagnosisList = []
    const diagnoses = (await diagnosisCollectionRef.get()).docs
    diagnoses.forEach((diagnosis) => {
      diagnosisList.push(diagnosis.data());
    });

return resolve( diagnosisList)
})

export const GET = async (url, body) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }//,
        // body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(obj => obj)
        .catch(error => console.log("\n[ERR]  @  [GET]  @  [URL:: " + url + "]\n[ERROR::MSG]:\n", error))
};
