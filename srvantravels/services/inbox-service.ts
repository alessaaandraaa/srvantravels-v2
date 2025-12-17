// services/inbox-service.ts
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
        sender: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  /** Get single message by ID */
  static async getMessageById(messageId: number) {
    return prisma.message.findUnique({
      where: {
        message_ID: messageId,
      },
      include: {
        sender: {
          select: {
            name: true,
            email: true,
          },
        },
        order: true,
      },
    });
  }
}
