import BreadCrumpComponent from "@/components/BreadCrumpComponent";
import ProfileComponent from "@/components/ProfileComponent";

export default async function TopNarbarComponent() {
  return (
    <nav className="flex justify-between items-center w-full px-20 py-6 shadow-sm">
      <BreadCrumpComponent />
      <ProfileComponent />
    </nav>
  );
}
