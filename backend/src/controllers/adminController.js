import prisma from "../config/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(200).json({
      success: true,
      users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};