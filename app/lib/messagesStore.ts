type Message = {
    date: string;
    pseudo: string;
    content: string;
  };
  
  let messages: Message[] = [];
  
  export function saveMessage(message: Message) {
    messages.push(message);
  }
  
  export function getMessagesForDate(date: string): Message[] {
    return messages.filter((msg) => msg.date === date);
  }
  
  export function getAllMessages(): Message[] {
    return messages;
  }
  