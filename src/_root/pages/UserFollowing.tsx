
import { useState, useEffect } from "react";
import { Loader, UserCard } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";
import { getUserById } from "@/lib/appwrite/api";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const UserFollowing = () => {
    const navigate = useNavigate();
    const { user, isLoading: isUserLoading } = useUserContext(); // Access global user state
    const [followers, setFollowers] = useState<any[]>([]); // Initialize followers state
    const [isFollowersLoading, setIsFollowersLoading] = useState(true);

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!user) return;

            try {
                const followerData = await Promise.all(
                    user.following.map(async (followerId: string) => {
                        const response = await getUserById(followerId);
                        return response;
                    })
                );
                setFollowers(followerData);
            } catch (error) {
                console.error("Failed to fetch followers", error);
            } finally {
                setIsFollowersLoading(false);
            }
        };

        fetchFollowers();
    }, [user]);

    if (isUserLoading || isFollowersLoading) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
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
                    <h2 className="h3-bold md:h2-bold text-left w-full">People you follow</h2>
                    <Button type="button"
                        className="py-3 shad-button_primary px-8 " onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>
                {followers.length > 0 ? (
                    <ul className="user-grid">
                        {followers.map(follower => (
                            <li key={follower.$id} className="flex-1 min-w-[200px] w-full">
                                <UserCard user={follower} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-400">You don't follow anyone yet</p>
                )}
            </div>
        </div>
    );
};

export default UserFollowing;
