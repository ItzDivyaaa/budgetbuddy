"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from './_components/AddExpense';
import ExpenseListTable from './_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { Pen, PenBox, Trash } from 'lucide-react';


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from './_components/EditBudget';


function ExpensesScreen({params}) {
  const {user}=useUser();
  const [budgetInfo,setBudgetInfo]=useState();
  const [expensesList,setExpensesList]=useState([]);
  const route=useRouter();
  useEffect(()=>{
    
    user&&getBudgetInfo();
  },[user]);

  //Get Budget Information

   const getBudgetInfo=async()=>{
      
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount}::float)`.mapWith(Number),
      totalItems:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .where(eq(Budgets.id,params.id))
    .groupBy(Budgets.id)

    setBudgetInfo(result[0]);
    getExpensesList();

   }
  
   //Get Latest Expenses:

   const getExpensesList=async()=>{
      const result=await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
   }

   //Used to delete budget

   const deleteBudget=async()=>{

      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning();

      if(deleteExpenseResult){
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast('Budget Deleted!');
     route.replace('/dashboard/budgets');

   }

  return (
    <div className='p-10'>
<h2 className='text-2xl font-bold flex justify-between items-center'>{budgetInfo?.name}

      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <BudgetItem
      budget={budgetInfo}
      />
      <AddExpense budgetId={params.id}
      user={user}
      refreshData={()=>getBudgetInfo()}
      />

      </div>
      <div className='flex gap-2 items-center '>
<EditBudget budgetInfo={budgetInfo}
  refreshData={()=>getBudgetInfo()}
/>
        
          <AlertDialog>
  <AlertDialogTrigger asChild>
  <Button className='flex gap-2' variant='destructive'>
  <Trash/> Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className="bg-white text-black">
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your current budget along with expenses remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</div>

      <div className='mt-4'>
        <h2 font-bold text-lg>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  )
}

export default ExpensesScreen
