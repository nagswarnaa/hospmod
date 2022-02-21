// import { doc, Firestore, getDoc } from "firebase/firestore";
// import { db, getAppts,  } from "../configs/firebase";

import {
  app,
  db
} from "../configs/firebase";
import {
  collection,
  query,
  onSnapshot,
  getDocs
} from "@firebase/firestore"

export const getAllTransactions = async () => {
  try {
    // const db = app.firestore()
    const allTransactions = []
    const pendingTransactions = []
    const completeTransactions = []

    const transactions = (await db.collection('transactions').get()).docs
    for (const transaction of transactions){

      if(transaction.data().status === 'Complete')
        completeTransactions.push(transaction.data())
      
      if(transaction.data().status === 'Pending')
        pendingTransactions.push(transaction.data())

      allTransactions.push(transaction.data())
    }
      
      
    console.log(allTransactions)
    return { allTransactions, completeTransactions, pendingTransactions}
  } catch (e) {
    console.log("[ERR]@[getTransactionsCollection]: ", e);
    return {
      error: e
    };
  }
}

export const getcompleteTransactions = async () => {
  try {
    // const db = app.firestore()
    const items = []
    const transactions = (await db.collection('transactions').where('status'.toLowerCase(),'==','Complete').get()).docs
    for (const transaction of transactions)
      items.push(transaction.data())
    console.log(items)
    return items
  } catch (e) {
    console.log("[ERR]@[getTransactionsCollection]: ", e);
    return {
      error: e
    };
  }
}

export const getpendingTransactions = async () => {
  try {
    // const db = app.firestore()
    const items = []
    const transactions = (await db.collection('transactions').where('status','==','Pending').get()).docs
    for (const transaction of transactions)
      items.push(transaction.data())
    console.log(items)
    return items
  } catch (e) {
    console.log("[ERR]@[getTransactionsCollection]: ", e);
    return {
      error: e
    };
  }
}

