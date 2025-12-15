const { prisma } = await import("@/lib/db");
import { MESSAGE_TYPES } from "@/types/db.types";
type Messages = {
  sender_ID: number;
  receiver_ID: number | null;
  order_ID: number | null;
  requested_date: Date | null;
  subject: string;
  content: string;
  type: (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
};

class MessagesService {
  async addMessage({
    sender_ID,
    receiver_ID,
    order_ID,
    requested_date,
    subject,
    content,
    type,
  }: Messages) {
    try {
      const newMessage = await prisma.message.create({
        data: {
          sender_ID,
          receiver_ID,
          order_ID,
          requested_date,
          subject,
          content,
          type,
        },
      });
      return newMessage;
    } catch (error) {
      console.error("Error sending message: ", error);
      throw new Error("Could not send message:");
    }
  }
}

export default MessagesService;
