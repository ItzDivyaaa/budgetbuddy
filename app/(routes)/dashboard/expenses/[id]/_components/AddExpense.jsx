"use client"
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { db } from '@/utils/dbConfig';
// import { Budgets, Expenses } from '@/utils/schema';
// import React, { useState } from 'react'
// import { toast } from 'sonner';

// function AddExpense({budgetId,user, refreshData}) {
//     // const [name,setName]=useState();
//     // const [amount,setAmount]=useState();
//     const [name, setName] = useState('');
// const [amount, setAmount] = useState('');
//     const addNewExpense = async () => {
//         const result = await db.insert(Expenses).values({
//             name: name,
//             amount: amount,
//             budgetId: budgetId,
//             createdBy: user?.primaryEmailAddress?.emailAddress,
//             date: new Date() // Set the current date as the expense date
//         }).returning({ insertedId: Expenses.id }); // Use Expenses.id instead of Budgets.id
    
//         if (result) {
//             refreshData();
//             toast('New Expense Added!');
//             refreshData();

//             setName(''); // Reset name state to empty string
//             setAmount(''); // Reset amount state to empty string
//             refreshData();
//           }
//     }
    
//   return (
//     <div className='border p-5 rounded-lg'>
//         <h2 className='font-bold text-lg'>Add Expense</h2>
//         <div>
//         <h2>Expense Name</h2>
//         <Input placeholder="e.g. Bedroom Decor"
//         onChange={(e)=>setName(e.target.value)}
//         />
//     </div> <div>
//         <h2>Expense Amount</h2>
//         <Input placeholder="e.g. 1000"
//         onChange={(e)=>setAmount(e.target.value)}
//         />
//     </div>
//         <Button disabled={!(name&&amount)} 
//         onClick={()=>{addNewExpense();
//             setName(''); // Reset name state to empty string
//             setAmount(''); 
//             refreshData();// Reset amount state to empty string

//         }}
        
//         className="mt-3 w-full">Add New Expense</Button>
//     </div>
//   )
// }

// export default AddExpense
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const addNewExpense = async () => {
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      date: new Date() // Set the current date as the expense date
    }).returning({ insertedId: Expenses.id }); // Use Expenses.id instead of Budgets.id

    if (result) {
      toast('New Expense Added!');
      refreshData();
      setName(''); // Reset name state to empty string
      setAmount(''); // Reset amount state to empty string
    }
  };

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div>
        <h2>Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h2>Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        onClick={addNewExpense}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  )
}

export default AddExpense