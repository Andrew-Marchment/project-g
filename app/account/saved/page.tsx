import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  return (
    <div>
      <h2>Hello, {user?.firstName}</h2>
    </div>
  );
}
