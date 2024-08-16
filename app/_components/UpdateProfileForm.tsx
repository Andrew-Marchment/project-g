import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "../_lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
import UpdateProfileImage from "./UpdateProfileImage";

async function UpdateProfileForm() {
  const user = await currentUser();

  return (
    <Card>
      <CardHeader>
        <div className="col-span-2 flex items-end justify-between gap-3">
          <Image
            src={user?.imageUrl || ""}
            alt={user?.firstName || "user"}
            width={75}
            height={75}
            className="rounded-full"
          />
          <UpdateProfileImage />
        </div>
      </CardHeader>
      <form action={updateProfile}>
        <CardContent className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input name="firstName" defaultValue={user?.firstName || ""} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input name="lastName" defaultValue={user?.lastName || ""} />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              defaultValue={user?.emailAddresses[0].emailAddress || ""}
              disabled
            />
          </div>
          {/* <div className="col-span-2">
            <Label>Password</Label>
            <Input />
          </div> */}
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton>Save changes</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}

export default UpdateProfileForm;
