import ChatItem from './ChatItem';

const ChatMessages = ({ messages }) => {
  return messages.map(message => (
    <ChatItem key={message.id} message={message} />
  ));
};
export default ChatMessages;
