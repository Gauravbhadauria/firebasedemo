import database, {firebase} from '@react-native-firebase/database';

export const getMessages = (senderId, receiverId) => {
  let tempMessages = [];
  database()
    .ref(`/chats/`)
    .child(senderId)
    .child('' + receiverId)
    .on('value', snapshot => {
      console.log(snapshot);
      snapshot.forEach(child => {
        const data = Object.values(child.val());
        data.map(item => {
          tempMessages.push({
            message: item.message,
            senderId: item.senderId,
            receiverId: item.receiverId,
          });
        });
      });
    });
  console.log(tempMessages);
  return tempMessages;
};
