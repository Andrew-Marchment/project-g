"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  // email: z.string().email(),
});

const UpdateProfileData = FormSchema;

export async function updateProfile(formData: FormData) {
  const user = await currentUser();
  const userId = user?.id || "";
  // const emailId = user?.primaryEmailAddressId || "";

  const {
    firstName,
    lastName,
    // email
  } = UpdateProfileData.parse({
    profileImage: formData.get("profileImage"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    // email: formData.get("email"),
  });

  // console.log({ userId, emailAddress: email, primary: true });
  // console.log(emailId);

  await clerkClient.users.updateUser(userId, { firstName, lastName });

  // await clerkClient.emailAddresses.createEmailAddress({
  //   userId,
  //   emailAddress: email,
  //   primary: true,
  //   verified: true,
  // });

  // await clerkClient.emailAddresses.deleteEmailAddress(emailId);

  revalidatePath("account/profile");
}
