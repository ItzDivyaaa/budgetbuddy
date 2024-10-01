import Link from "next/link";

function BudgetItem({ budget }) {
  if (!budget) {
    return <div>Loading...</div>;
  }

  // Calculate remaining or overdue amount
  const remainingAmount = budget.amount - (budget.totalSpend || 0);
  const isOverdue = remainingAmount < 0;

  return (
    <Link
      href={'/dashboard/expenses/' + budget?.id}
      className="p-5 border rounded-lg gap-3 hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex items-center justify-between">
        <div className="mr-3">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
        </div>
        <div>
          <h2 className="font-bold">{budget.name}</h2>
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">₹{budget.amount}</h2>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">₹{budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
          {/* Conditionally show "overdue" or "remaining" */}
          {isOverdue ? (
            <h2 className="text-xs text-red-500">₹{Math.abs(remainingAmount)} Overdue</h2>
          ) : (
            <h2 className="text-xs text-slate-400">₹{remainingAmount} Remaining</h2>
          )}
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
        <div
  className={"w-" + Math.min((budget.totalSpend / budget.amount) * 100, 100) + "% bg-primary h-2 rounded-full"}
></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;