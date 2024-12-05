import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateUser } from "../../graphql/mutations";

export const UserDelete = () => {
  const client = generateClient();

  const SubmitDeletedUser = useCallback(async ({ deleteUserData }) => {
    if (!deleteUserData) {
      throw new Error("Missing required parameters");
    }

    const { id } = deleteUserData;

    const deletingUser = {
      id: id,
      status: "InActive"
    };

    console.log(id);

    try {
      await client
        .graphql({
          query: updateUser,
          variables: {
            input: deletingUser, // Pass the 'input' in the expected format
          },
        })
        .then((res) => {
          console.log(res, "deleted successfully");
          window.location.href = "/user";
        });
    } catch (err) {
      console.log("Error deleting user:", err);
    }
  }, [client]); // Pass an empty array as the second argument if there are no dependencies

  return { SubmitDeletedUser };
};
