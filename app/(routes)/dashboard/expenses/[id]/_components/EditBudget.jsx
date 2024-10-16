"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'

function EditBudget({budgetInfo,refreshData}) {
    if (!budgetInfo) {
        return <div>Loading...</div>;
      }
    const [emojiIcon, setEmojiIcon]=useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker]=useState(false);
    const [name,setName]=useState();
    const [amount,setAmount]=useState();

    const {user}=useUser();

    useEffect(()=>{
        setEmojiIcon(budgetInfo?.icon)
        setAmount(budgetInfo?.amount)
        setName(budgetInfo?.name)
    },[budgetInfo])
    const onUpdateBudget=async()=>{
            const result=await db.update(Budgets).set({
                name:name, 
                amount:amount,
                icon:emojiIcon
            }).where(eq(Budgets.id,budgetInfo.id))
            .returning();

            if(result){
                toast('Budget Updated!');
                refreshData();
            }
    }

  return (
    <div>
     <Dialog>
  <DialogTrigger asChild>
  <Button classname='flex gap-2'> <PenBox/>Edit</Button>

  </DialogTrigger>
  <DialogContent className="bg-white text-black">
    <DialogHeader>
      <DialogTitle>Update Budget</DialogTitle>
      <DialogDescription>
        <div className='mt-5'>
        <Button variant="outline"
        size="lg"
        className="text-lg"
        onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
        >{emojiIcon}</Button>

      <div className='absolute z-20'>
      <EmojiPicker
      open={openEmojiPicker}
      onEmojiClick={(e)=>{
        setEmojiIcon(e.emoji)
        setOpenEmojiPicker(false)
      }}
      />
    </div>
    {/* <div>
        <h2>Budget Name</h2>
        <Input placeholder="e.g. Home Decor"
        defaultValue={budgetInfo?.name}
        onChange={(e)=>setName(e.target.value)}
        />
    </div>
    <div>
        <h2>Budget Amount</h2>
        <Input
        type="number"
        placeholder="e.g.₹5000"
        defaultValue={budgetInfo?.name}

        onChange={(e)=>setAmount(e.target.value)}
        />

    </div> */}
    <div>
  <h2>Budget Name</h2>
  <Input 
    placeholder="e.g. Home Decor"
    value={name}
    onChange={(e)=>setName(e.target.value)}
  />
</div>
<div>
  <h2>Budget Amount</h2>
  <Input 
    type="number"
    placeholder="e.g.₹5000"
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
  />
</div>
   
    </div>
      </DialogDescription>

    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
    disabled={!(name&&amount)}
    onClick={()=>onUpdateBudget()}
    className="mt-5 w-full">Update Budget</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>
</div>
  )
}

export default EditBudget