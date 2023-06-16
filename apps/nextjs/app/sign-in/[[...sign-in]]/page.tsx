import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen flex-row items-center justify-center border">
      <SignIn />
    </div>
  );
}
