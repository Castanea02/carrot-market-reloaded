import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.create({
    data: {
      token: "121212",
      user: {
        connect: { username: "John Doe" },
      },
    },
  });
  console.log("Token created:", token);
}

test();

export default db;
