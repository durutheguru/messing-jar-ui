
import gql from "graphql-tag";


const fetchPreviews = gql`
  query (
    $chatPreviewPage: Int
    $chatPreviewSize: Int
    $groupPreviewPage: Int
    $groupPreviewSize: Int
  ) {

    fetchChatPreviews(
      page: $chatPreviewPage
      size: $chatPreviewSize
    ) {
        chatId
        username
        fullName
        lastMessage
        lastMessageTimeStamp
        profilePictureUrl
    }

    fetchGroupPreviews(
        page: $groupPreviewPage
        size: $groupPreviewSize
    ) {
        groupId
        groupName
        lastMessage
        lastMessageTimeStamp
        groupImageUrl
    }
  }
`;

export {
    fetchPreviews,
};

