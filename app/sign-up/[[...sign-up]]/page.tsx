import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#161616]">
      <SignUp />
    </div>
  );
}
