import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, FormControl,FormControlLabel,FormLabel, } from '@material-ui/core';

import {getAllTransactions, getcompleteTransactions,  getpendingTransactions,} from "../../js/transactions";

import { useNavigate } from "react-router-dom";
const Transactions = () => {

  const [selectedTransactions, setSelectedTransactions] = useState('all')
  const [transactionsList, setTransactionsList] = useState([])
  const [transaction, setTransaction] = useState([])
  const [completeTransaction, setCompleteTransaction] = useState([])
  const [pendingTransaction, setPendingTransaction] = useState([])
    useEffect(() => {
  const getTransaction= async () =>{
      const { allTransactions, completeTransactions, pendingTransactions} = await getAllTransactions()
     setTransaction(allTransactions, 
      setCompleteTransaction(completeTransactions),
        setPendingTransaction(pendingTransactions))
     
  }
  getTransaction()
},[])

useEffect(() => {

  if(selectedTransactions === 'all') setTransactionsList(transaction)
  else if(selectedTransactions === 'pending') setTransactionsList(pendingTransaction)
  else if(selectedTransactions === 'complete') setTransactionsList(completeTransaction)
  else setTransactionsList(transaction)
}, [selectedTransactions])

// const allTransaction = (e) => {
//   e.preventDefault();
//   const getTransaction = async () => {
//     const res = await getAllTransactions()
//     setTransaction(res)
//   }
//   getTransaction()
// }
// const completeTransaction = (e) => {
//     e.preventDefault();
//     const getTransaction = async () => {
//       const res = await getcompleteTransactions()
//       setTransaction(res)
//     }
// getTransaction()
// }
// const pendingTransaction = (e) => {
//     e.preventDefault();
//     const getTransaction = async () => {
//       const res = await getpendingTransactions()
//       setTransaction(res)
//     }
// getTransaction()
// }
const TransDisp = transactionsList.map((disp) =>
<tr key = {disp.transactionId}>
  <td> {disp.transactionId} </td>
  <td> {disp.transactionAmt} </td>
  <td> {disp.patientId} </td>
  <td> {disp.status} </td>
</tr>);
let navigate = useNavigate();
  const routeChange = () =>{
    let path = '/createtransaction-patientstable';
    navigate(path)
  }
  let dashnavigate = useNavigate();
    const dashboard = () =>{
      let dashpath = '/dashboard';
      dashnavigate(dashpath)
    }
    return(
        <div className={`dashboard-container`}>
              <div className={`row full-w left-hv`}>
              <select id = "myList" >
                <option> Transaction ID </option>
                <option> Patient ID </option>
              </select>
                <input type='text' name='search' placeholder='Enter a value' id='searchbar'></input>
                <button onClick = {routeChange}> New Transaction </button>
              </div>
              <div align = "right">
              <button onClick = {dashboard}> Back to Dashboard </button>
              </div>
              <div align = "row full-w left-hv">
                  <FormControl>
                  <FormLabel id="Transactions"></FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="Transactions-group" row
                  >
                      <FormControlLabel value="all_transactions" onChange={() => setSelectedTransactions('all')} control={<Radio />} label="All Transactions" />
                      <FormControlLabel value="complete_transactions" onChange={() => setSelectedTransactions('complete')} control={<Radio />} label="Complete Transactions" />
                      <FormControlLabel value="pending_transactions" onChange={() => setSelectedTransactions('pending')} control={<Radio />} label="Pending Transactions" />
                  </RadioGroup>
                  </FormControl>
              </div>
                <div align = "row full-w left-hv">

                </div>
              <div className={`row full-w left-hv`}>
                <table align = "Left" border = "2">
                  <tbody>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Transaction Amount</th>
                      <th>Patient ID</th>
                      <th>Status</th>
                    </tr>
                      {TransDisp}
                  </tbody>
                </table>
            </div>
        </div>
    )
};

export default Transactions;
