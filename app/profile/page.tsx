import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#161616] py-10">
      <UserProfile />
    </div>
  );
}
