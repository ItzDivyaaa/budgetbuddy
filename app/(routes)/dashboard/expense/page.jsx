"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig'; 
import { Expenses, Budgets } from '@/utils/schema'; 
import { desc, eq, getTableColumns } from 'drizzle-orm'; 
import { useUser } from '@clerk/nextjs'; 

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  const fetchAllExpenses = async () => {
    try {
      if (user) {
        const result = await db
          .select({
            ...getTableColumns(Expenses), 
            budgetName: Budgets.name, 
            date: Expenses.date,
          })
          .from(Expenses) 
          .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id)) 
          .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress)) 
          .orderBy(desc(Expenses.id)); 

        setExpensesList(result);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // const downloadCSV = () => {
  //   const csvRows = [];
  //   // const headers = ['ID', 'Name', 'Amount', 'Budget Name', 'Created By'];
  //   const headers = ['ID', 'Name', 'Amount', 'Budget Name', 'Date', 'Created By']; // Add 'Date' to the headers
 
  //   csvRows.push(headers.join(','));

  //   expensesList.forEach(expense => {
  //     const row = [
  //       expense.id,
  //       expense.name,
  //       expense.amount,
  //       expense.budgetName || 'N/A',
  //       expense.date.toLocaleDateString(), // Add the date to the row

  //       expense.createdBy,
  //     ];
  //     csvRows.push(row.join(','));
  //   });

  //   const csvString = csvRows.join('\n');
  //   const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'expenses.csv');
  //   link.style.visibility = 'hidden';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = ['ID', 'Name', 'Amount', 'Budget Name', 'Date', 'Created By'];
    csvRows.push(headers.join(','));
  
    expensesList.forEach(expense => {
      const row = [
        expense.id,
        expense.name,
        expense.amount,
        expense.budgetName || 'N/A',
        new Date(expense.date).toLocaleDateString(), // Convert the date string to a Date object
        expense.createdBy,
      ];
      csvRows.push(row.join(','));
    });
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    fetchAllExpenses();
  }, [user]);

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold mb-4'>All Expenses</h2>
      
      <button 
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded" 
        onClick={downloadCSV}
      >
        Download CSV
      </button>
      
      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="bg-gray-100 border border-gray-300 p-2 text-left">ID</th>
            <th className="bg-gray-100 border border-gray-300 p-2 text-left">Name</th>
            <th className="bg-gray-100 border border-gray-300 p-2 text-left">Amount</th>
            <th className="bg-gray-100 border border-gray-300 p-2 text-left">Budget Name</th>
            <th className="bg-gray-100 border border-gray-300 p-2 text-left">Date</th>

            <th className="bg-gray-100 border border-gray-300 p-2 text-left">Created By</th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{expense.id}</td>
              <td className="border border-gray-300 p-2">{expense.name}</td>
              <td className="border border-gray-300 p-2">₹{expense.amount}</td>
              <td className="border border-gray-300 p-2">{expense.budgetName || 'N/A'}</td>
              <td className="border border-gray-300 p-2">{new Date(expense.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{expense.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesScreen;
