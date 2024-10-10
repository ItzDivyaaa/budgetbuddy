'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js
import { Layout, PiggyBank, ReceiptText } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

function SideNav() {
    const router = useRouter();
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: Layout,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expense'
        }
    ];
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className='h-screen p-5 border shadow-md'>
            <Link href='/dashboard'>
                <Image src={'/logo2.png'} alt='logo' height={100} width={160} />
            </Link>
            <div className='mt-5'>
                {menuList.map((menu) => (
                    <h2
                        key={menu.id}
                        className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md
                        hover:text-primary hover:bg-blue-100
                        ${path === menu.path && 'text-primary bg-blue-100'}`}
                        onClick={() => router.push(menu.path)}  // Navigate to selected route
                    >
                        <menu.icon />
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className='fixed bottom-5 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    );
}

export default SideNav;
// 'use client';
// import React, { useEffect } from 'react';
// import Image from 'next/image';
// import { Layout, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
// import { UserButton } from '@clerk/nextjs';
// import { usePathname, useRouter } from 'next/navigation';

// function SideNav() {
//     const router = useRouter();
//     const menuList = [
//         {
//             id: 1,
//             name: 'Dashboard',
//             icon: Layout,
//             path: '/dashboard'
//         },
//         {
//             id: 2,
//             name: 'Budgets',
//             icon: PiggyBank,
//             path: '/dashboard/budgets'
//         },
//         {
//             id: 3,
//             name: 'Expenses',
//             icon: ReceiptText,
//             path: '/dashboard/expense'
//         }
 
//     ];
//     const path = usePathname();

//     useEffect(() => {
//         console.log(path);
//     }, [path]);

//     return (
//         <div className='h-screen p-5 border shadow-md'>
//             <Image src={'/logo2.png'} alt='logo' height={100} width={160}></Image>
//             <div className='mt-5'>
//                 {menuList.map((menu) => (
//                     <h2
//                         key={menu.id}
//                         className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md
//                         hover:text-primary hover:bg-blue-100
//                         ${path === menu.path && 'text-primary bg-blue-100'}`}
//                         onClick={() => router.push(menu.path)}  // Navigate to selected route
//                     >
//                         <menu.icon />
//                         {menu.name}
//                     </h2>
//                 ))}
//             </div>
//             <div className='fixed bottom-5 p-5 flex gap-2 items-center'>
//                 <UserButton />
//                 Profile
//             </div>
//         </div>
//     );
// }

// export default SideNav;