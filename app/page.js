import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
// import { currentUser } from "@clerk/nextjs";
import { ClerkProvider,SignedIn,SignedOut, SignIn } from "@clerk/nextjs";
// const user=await currentUser();
export default function Home() {
  return (
    <div>
    {/* <SignInButton></SignInButton> */}
    <SignedOut>
       <SignIn routing="hash"/>
       </SignedOut> 
       <SignedIn>
       <Header></Header>
       <Hero></Hero>
      </SignedIn>
    </div>
  );
}
