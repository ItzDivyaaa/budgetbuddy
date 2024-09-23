"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import BudgetList from '../../../budgets/_components/BudgetList';
import { toast } from 'sonner';

function AddExpense({budgetId,user}) {
    const [name,setName]=useState();
    const [amount,setAmount]=useState();
    const addNewExpense=async () => {
        const result=await db.insert(Expenses).values({
            name:name,
        amount:amount,
        budgetId:budgetId,
        createdAt:user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id});

        if(result){
            toast('New Expense Added!')
        }
    }
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Add Expense</h2>
        <div>
        <h2>Expense Name</h2>
        <Input placeholder="e.g. Bedroom Decor"
        onChange={(e)=>setName(e.target.value)}
        />
    </div> <div>
        <h2>Expense Amount</h2>
        <Input placeholder="e.g. 1000"
        onChange={(e)=>setAmount(e.target.value)}
        />
    </div>
        <Button disabled={!(name&&amount)} 
        onClick={()=>addNewExpense()}
        className="mt-3 w-full">Add New Expense</Button>
    </div>
  )
}

export default AddExpense