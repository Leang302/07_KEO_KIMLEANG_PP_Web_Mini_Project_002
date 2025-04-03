import { getCurrentUser } from "@/services/ProfileService";
import { Bell } from "lucide-react";
import Image from "next/image";
export default async function ProfileComponent() {
  const users = await getCurrentUser();
  return (
    <div className="flex items-center justify-between w-[240px] gap-6">
      <Bell />
      {/*avatar*/}
      <Image
        src={users?.payload?.profile}
        alt={"asdasd"}
        width="55"
        height="55"
        className="rounded-full "
      />
      <div className="flex flex-col justify-center ">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {users?.payload?.username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {users?.payload?.email}
        </p>
      </div>
    </div>
  );
}
