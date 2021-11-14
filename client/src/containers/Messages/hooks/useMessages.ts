import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { useState, useEffect } from "react";
import { MessengerClient } from "messenger/MessengerServiceClientPb";
import { ClientReadableStream } from "grpc-web";
import { MessageResponse } from "messenger/messenger_pb";

export const useMessages = (client: MessengerClient) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const stream = client.getMessages(new Empty()) as ClientReadableStream<MessageResponse>
    stream.on("data", m => {
      setMessages(state => [...state, m.getMessage()]);
    });

    return () => stream.cancel()

  }, [client]);

  return {
    messages
  };
};
