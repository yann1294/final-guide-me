import SignUp from "@/components/auth/SignUp/SignUp";

export default function TouristSignupPage() {
  return (
    <div>
      <SignUp userRole={{ name: "tourist" }} />{" "}
      {/* no userRole passed → defaults to tourist */}
    </div>
  );
}
