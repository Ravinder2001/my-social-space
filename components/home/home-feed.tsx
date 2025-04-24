import { StoriesSection } from "@/components/home/stories-section";
import { CreatePostBox } from "@/components/home/create-post-box";
import { TrendingTopics } from "@/components/home/trending-topics";
import { SuggestedUsers } from "@/components/home/suggested-users";
import { serverAPICall } from "../utils/serverAPICall";
import CONSTANTS from "../utils/constants";
import { PostCard } from "./post-card";
import { PostType } from "../utils/CommanTypes";

const getData = async () => {
  const res = await serverAPICall(CONSTANTS.API_ROUTES.GET_ALL_POST);
  if (res?.status == 200) {
    return res?.data?.data;
  }
};

export async function HomeFeed() {
  const postList: PostType[] = await getData();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StoriesSection />
          <CreatePostBox />
          <div className="space-y-6">
            {postList.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block space-y-6">
          <TrendingTopics />
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
}
