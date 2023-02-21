

import gql from "graphql-tag";


const fetchGroupChatData = gql`
  query (
    $groupId: String!
  ) {

    fetchGroupDetails(
        groupId: $groupId
    ) {
        id
        name
        memberCount
    }

    fetchGroupMembers(
        groupId: $groupId
    ) {
        groupId
        username
        fullName
        imageUrl
    }
  }
`;

export {
    fetchGroupChatData,
};




