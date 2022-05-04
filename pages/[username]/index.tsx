import { Flex } from "@chakra-ui/react";

import UserProlife from "components/UserProlife";
import PostFeed from "components/PostFeed";
import { getUserWithUsername, postToJSON } from "lib/firebase";
getUserWithUsername;

export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);
  // JSON serializiable data
  let user = null;
  let posts = null;
  if (userDoc) {
    user = userDoc.data();
    const postQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postQuery.get()).docs.map(postToJSON);

    return {
      props: { user, posts },
    };
  }
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <Flex gap={8} flexDir="column">
      <UserProlife user={user} />
      <PostFeed posts={posts} />
    </Flex>
  );
};

export default UserProfilePage;