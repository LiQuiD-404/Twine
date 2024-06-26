import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { addFollower, unfollowUser } from "@/lib/appwrite/api";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: currentUser, refetch } = useGetUserById(id || "");

  useEffect(() => {
    if (currentUser && user) {
      setIsFollowing(currentUser.followers.includes(user.id));
    }
  }, [currentUser, user]);

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const handleFollowClick = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await addFollower({ userId: user.id, followerId: currentUser.$id });
      refetch();
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollowClick = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await unfollowUser({ userId: user.id, followerId: currentUser.$id });
      refetch();
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
              <p className="small-regular md:body-medium text-light-4 text-center xl:text-left">
                {currentUser.email}
              </p>
            </div>

            <p className="small-medium text-gray-300 md:base-medium text-center xl:text-left mt-5 max-w-screen-sm">
              {currentUser.bio || "Bio not available"}
            </p>

            <div className="flex gap-8 mt-8 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />

              {/* Link to followers */}
              {user.id === currentUser?.$id ? (
                <Link to={`/user-followers/${currentUser.$id}`}>
                  <StatBlock value={currentUser.followers.length} label="Followers" />
                </Link>
              ) : (
                <StatBlock value={currentUser.followers.length} label="Followers" />
              )}

              {/* Link to following */}
              {user.id === currentUser?.$id ? (
                <Link to={`/user-following/${currentUser.$id}`}>
                  <StatBlock value={currentUser.following.length} label="Following" />
                </Link>
              ) : (
                <StatBlock value={currentUser.following.length} label="Following" />
              )}
            </div>

          </div>

          <div className="flex justify-center gap-4">
            {user.id === currentUser.$id ? (
              <Link
                to={`/update-profile/${currentUser.$id}`}
              >

                <Button type="button"
                  className="shad-button_primary px-8">
                  Edit Profile
                </Button>

              </Link>
            ) : (
              <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
                disabled={loading}
              >
                {loading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${pathname === `/profile/${id}` && "!bg-dark-3"
              }`}
          >
            <img
              src="/assets/icons/posts.svg"
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
              }`}
          >
            <img
              src="/assets/icons/like.svg"
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        {currentUser.posts.length > 0 ? (
          <Route
            index
            element={<GridPostList posts={currentUser.posts} showUser={false} />}
          />
        ) : ("No posts to show")}

        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
