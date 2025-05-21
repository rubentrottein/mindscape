// components/MessageList.tsx
type Message = {
    pseudo: string
    content: string
  }
  
  export default function MessageList({ messages }: { messages: Message[] }) {
    if (messages.length === 0) return <p className="text-gray-400">Aucun message pour aujourd’hui.</p>
  
    return (
      <ul className="space-y-4">
        {messages.map((msg, i) => (
          <li key={i} className="border p-4 rounded bg-white shadow-sm">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.content}</p>
            <p className="text-xs text-right text-gray-500 mt-2">– {msg.pseudo}</p>
          </li>
        ))}
      </ul>
    )
  }
  