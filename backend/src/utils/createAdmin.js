import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  const existing =
    await prisma.user.findUnique({
      where: {
        email: "admin@test.com"
      }
    });

  if (existing) {
    console.log("Admin exists");
    return;
  }

  const hashed =
    await bcrypt.hash(
      "Admin@123",
      10
    );

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: hashed,
      role: "ADMIN"
    }
  });

  console.log(
    "Admin created"
  );
};

createAdmin();