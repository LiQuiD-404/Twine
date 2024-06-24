import { Models } from "appwrite";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { useState } from "react";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";

const Home = () => {
  const { user } = useUserContext();
  const [toggle, setToggle] = useState(true);
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  // Filter posts based on the current user's following list
  const filteredPosts = posts?.documents.filter((post: Models.Document) =>
    user?.following.includes(post.creator.$id) || post.creator.$id === user?.id
  );

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            {(() => {
              const hours = new Date().getHours();
              if (hours >= 12) {
                return hours > 17 ? "Good Evening!" : "Good Afternoon!";
              } else {
                return "Good Morning!";
              }
            })()}
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (filteredPosts ?? []).length > 0 ? (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {(filteredPosts ?? []).map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Start following to see posts</p>
          )}
        </div>
      </div>
      {toggle ? (
        <div className="home-creators">
          <div className="flex flex-row justify-between">
            <h3 className="h3-bold text-light-1">Top Creators</h3>
            <button
              type="button"
              onClick={() => setToggle(false)}
              className="bg-black-500 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="grid 2xl:grid-cols-2 gap-6">
              {creators?.documents.map((creator) => (
                <li key={creator?.$id}>
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Button
          className="fixed bottom-4 right-4 p-2 text-light-1 bg-primary-500"
          onClick={() => setToggle(true)}
        >
          Top Creators
        </Button>
      )}
    </div>
  );
};

export default Home;
