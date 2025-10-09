const { prisma } = await import("@/lib/db");

type Customer = {
  customer_ID: number;
  payment_ID: number;
  number_of_PAX: number;
  date_of_travel: Date;
  number_of_luggage: number | null;
  ID_Picture: string;
};

function safeDecodeBase64(value: string): string {
  try {
    const decoded = Buffer.from(value, "base64").toString("utf8");
    // If it starts with "/" or "C:", decoding succeeded
    if (decoded.startsWith("/") || /^[A-Z]:\\/i.test(decoded)) {
      return decoded;
    }
    // Otherwise, return as-is
    return value;
  } catch {
    return value;
  }
}

class CustomerService {
  async addCustomer({
    customer_ID,
    payment_ID,
    number_of_PAX,
    date_of_travel,
    number_of_luggage,
    ID_Picture,
  }: Customer) {
    try {
      console.log("ID PIC: ", ID_Picture);
      const fixedPath = safeDecodeBase64(ID_Picture);

      console.log("Decoded path before insert:", fixedPath);
      const newCustomer = await prisma.customer.create({
        data: {
          customer_ID,
          payment_ID,
          number_of_PAX,
          date_of_travel,
          number_of_luggage,
          ID_Picture: fixedPath,
        },
      });
      return newCustomer;
    } catch (error) {
      console.error("Error adding customer:", error);
      throw new Error("An unexpected error occurred while adding customer.");
    }
  }
  // TODO: GET, EDIT, DELETE
}

export default CustomerService;
