import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList && budgetList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    if (!Array.isArray(budgetList)) return;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += element.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <Link href='/dashboard/budgets' className='p-7 border rounded-lg flex items-center justify-between hover:bg-gray-100 transition'>
        <div>
          <h2 className='text-sm'>Total Budget</h2>
          <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
        </div>
        <PiggyBank className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current' />
      </Link>

      <Link href='/dashboard/budgets' className='p-7 border rounded-lg flex items-center justify-between hover:bg-gray-100 transition'>
        <div>
          <h2 className='text-sm'>Budget Items</h2>
          <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
        </div>
        <Wallet className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current' />
      </Link>

      <Link href='/dashboard/expense' className='p-7 border rounded-lg flex items-center justify-between hover:bg-gray-100 transition'>
        <div>
          <h2 className='text-sm'>Total Spend</h2>
          <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
        </div>
        <ReceiptText className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current' />
      </Link>

      {/* Uncomment if you want to render these rotating divs
      <div>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className='h-[160px] w-full bg-slate-200 animate-spin rounded-lg'></div>
        ))}
      </div>
      */}
    </div>
  );
}

export default CardInfo;
// import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// function CardInfo({ budgetList }) {
//   const [totalBudget, setTotalBudget] = useState(0);
//   const [totalSpend, setTotalSpend] = useState(0);

//   useEffect(() => {
//     if (budgetList && budgetList.length > 0) {
//       CalculateCardInfo();
//     }
//   }, [budgetList]);

//   const CalculateCardInfo = () => {
//     let totalBudget_ = 0;
//     let totalSpend_ = 0;

//     if (!Array.isArray(budgetList)) return; // Check if budgetList is an array

//     budgetList.forEach((element) => {
//       totalBudget_ += Number(element.amount);
//       totalSpend_ += element.totalSpend;
//     });

//     setTotalBudget(totalBudget_);
//     setTotalSpend(totalSpend_);
//   };
//   return (
//     <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//       <div className='p-7 border rounded-lg flex items-center justify-between'>
//             <div>
//             <h2 className='text-sm'>Total Budget</h2>
//             <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
//             </div>
//             <PiggyBank className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current'
//             />
//         </div>
//         <div className='p-7 border rounded-lg flex items-center justify-between'>
//             <div>
//             <h2 className='text-sm'>Budget Items</h2>
//             <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
//             </div>
//             <Wallet className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current'
//             />
//         </div>
//         <div className='p-7 border rounded-lg flex items-center justify-between'>
//             <div>
//             <h2 className='text-sm'>Total Spend</h2>
//             <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
//             </div>
//             <ReceiptText  className='bg-primary rounded-full p-3 h-12 w-12 text-white fill-current'
//             />
//         </div>
        
       
        
//     <div>
//        { [1,2,3].map((item,index)=>{
//             <div className='h-[160px] w-full bg-slate-200 animate-spin rounded-lg'>
//             </div>
//         })}
//     </div>
    
    
//     </div>
    
//   )
  
// }

// export default CardInfo;
