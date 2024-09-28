import { integer, numeric, date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(), 
  icon: varchar('icon'), 
  createdBy: varchar('createdBy').notNull()
});

export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: numeric('amount').notNull().default(0),
  date: date('date').notNull().default(() => 'CURRENT_DATE'),
  budgetId: integer('budgetId').references(() => Budgets.id),
  createdBy: varchar('createdBy').notNull()
});