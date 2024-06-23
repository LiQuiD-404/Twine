// AllUsers.tsx

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader, UserCard } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();
  const { user } = useUserContext(); // Access global user state
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  const [key, setKey] = useState(0); // State to force re-render

  useEffect(() => {
    // Force re-render whenever 'user' changes
    setKey((prevKey) => prevKey + 1);
  }, [user]); // Include 'user' in dependencies

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return null; // or return an error message
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex gap-2 w-full max-w-5xl">
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Discover People</h2>
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid" key={key}> {/* Use key prop to force re-render */}
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard key={creator?.$id} user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
