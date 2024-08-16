import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  return (
    <div>
      <h2 className="mb-3 text-xl text-primary">Update your profile</h2>
      <p className="mb-5">
        Keep your profile up to date for the best experience.
      </p>
      <UpdateProfileForm />
    </div>
  );
}
