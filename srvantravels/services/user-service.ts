import { prisma } from "@/lib/db";

type Contact = {
  customer_id: number;
  contact: string;
};

class UserService {
  async addContact({ customer_id, contact }: Contact) {
    try {
      const contactAdd = await prisma.person.update({
        where: {
          person_ID: customer_id,
        },
        data: {
          contact_number: contact,
        },
      });

      console.log("ADDED CONTACT: ", contactAdd);
      return contactAdd;
    } catch (error) {
      console.error("Error adding contact number:", error);
      throw new Error("Could not add contact.");
    }
  }
}

export default UserService;
