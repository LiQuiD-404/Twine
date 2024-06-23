// UserCard.tsx

import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();

  const isFollowing = currentUser?.following?.includes(user.$id);
  const isOwnProfile = currentUser.id === user.$id;

  const handleFollowClick = async () => {
    try {
      // Implement follow/unfollow logic here
      // Example: Toggle follow state
      // This part should update the currentUser context or trigger a refresh if applicable
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      {!isOwnProfile && (
        <div className="text-center">
          <Button
            type="button"
            className="shad-button_primary px-8"
            onClick={handleFollowClick}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      )}

      {isOwnProfile && (
        <div className="text-center">
          <Button
            type="button"
            className="shad-button_primary px-8"
          >
            Your Profile
          </Button>
        </div>
      )}
    </Link>
  );
};

export default UserCard;
