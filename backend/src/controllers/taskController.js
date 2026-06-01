import prisma from "../config/prisma.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json({
      success: true,
      tasks
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    const { title, description, completed } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        title,
        description,
        completed
      }
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await prisma.task.delete({
      where: {
        id: task.id
      }
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};