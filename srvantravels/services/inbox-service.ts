const { prisma } = await import("@/lib/db");

export class InboxService {
  static async getInboxList() {
    return prisma.message.findMany({
      orderBy: {
        sent_at: "desc",
      },
      select: {
        message_ID: true,
        subject: true,
        type: true,
        sent_at: true,
        person_message_sender_IDToperson: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async getMessageById(messageId: number) {
    return prisma.message.findUnique({
      where: {
        message_ID: messageId,
      },
      include: {
        person_message_sender_IDToperson: {
          select: {
            name: true,
            email: true,
          },
        },
        order_details: true,
      },
    });
  }
}
