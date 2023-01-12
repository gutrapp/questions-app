import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const AnswerRouter = express.Router();
const prisma = new PrismaClient();

AnswerRouter.get(
  "/answer/question/:question_id",
  async (req: Request, res: Response) => {
    const answers = await prisma.answer.findMany({
      where: {
        question_id: parseInt(req.params.question_id),
      },
    });
    return res.json(answers);
  }
);

AnswerRouter.get("/answer/:id", async (req: Request, res: Response) => {
  const answers = await prisma.answer.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(answers);
});

AnswerRouter.post("/answer", async (req: Request, res: Response) => {
  const { author, content, question_id, secret } = req.body;

  const createdAnswer = await prisma.answer.create({
    data: {
      author,
      content,
      question_id: parseInt(question_id),
      secret,
    },
  });
  return res.json(createdAnswer);
});

AnswerRouter.put("/answer/edit/:id", async (req: Request, res: Response) => {
  const { content } = req.body;

  const updatedAnswer = await prisma.answer.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      content,
    },
  });
  return res.json(updatedAnswer);
});

AnswerRouter.put("/answer/like/:id", async (req: Request, res: Response) => {
  const { likes } = req.body;

  const updatedAnswer = await prisma.answer.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      likes: likes + 1,
    },
  });
  return res.json(updatedAnswer);
});

AnswerRouter.delete("/answer/:id", async (req: Request, res: Response) => {
  const deletedAnswer = await prisma.answer.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(deletedAnswer);
});

export { AnswerRouter };
