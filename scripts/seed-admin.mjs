import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme1234";
  const name = process.env.ADMIN_NAME || "소장";

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) {
    await prisma.adminUser.update({
      where: { username },
      data: { passwordHash, name },
    });
    console.log(`✓ Admin '${username}' password updated.`);
  } else {
    await prisma.adminUser.create({
      data: { username, passwordHash, name },
    });
    console.log(`✓ Admin '${username}' created.`);
  }

  console.log(`Login URL: /admin/login    username=${username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
