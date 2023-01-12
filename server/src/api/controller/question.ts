import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const QuestionRouter = express.Router();
const prisma = new PrismaClient();

QuestionRouter.get("/question", async (req: Request, res: Response) => {
  const questions = await prisma.question.findMany();
  return res.json(questions);
});

QuestionRouter.post("/question", async (req: Request, res: Response) => {
  const { author, content, secret } = req.body;

  const createdQuestion = await prisma.question.create({
    data: {
      author,
      content,
      secret,
    },
  });
  return res.json(createdQuestion);
});

QuestionRouter.get("/question/:id", async (req: Request, res: Response) => {
  const question = await prisma.question.findMany({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(question);
});

QuestionRouter.put("/question/edit/:id", async (req: Request, res: Response) => {
  const { content } = req.body;
  const updatedQuestion = await prisma.question.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      content,
    },
  });
  return res.json(updatedQuestion);
});

QuestionRouter.put(
  "/question/like/:id",
  async (req: Request, res: Response) => {
    const { likes } = req.body;

    const updatedQuestion = await prisma.question.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        likes: likes + 1,
      },
    });
    return res.json(updatedQuestion);
  }
);

QuestionRouter.delete("/question/:id", async (req: Request, res: Response) => {
  const deleteAnswers = await prisma.answer.deleteMany({
    where: {
      question_id: parseInt(req.params.id),
    },
  });

  const deletedQuestion = await prisma.question.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json({
    deletedQuestion,
    deleteAnswers,
  });
});

export { QuestionRouter };
