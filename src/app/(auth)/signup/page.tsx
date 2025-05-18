import SignUp from "@/components/auth/SignUp/SignUp";

export default function DefaultSignupPage() {
  return (
    <div>
      <SignUp /> {/* no userRole passed → defaults to tourist */}
    </div>
  );
}
