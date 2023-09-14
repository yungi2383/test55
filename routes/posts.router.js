import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

/** 게시글 작성 API **/
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await prisma.posts.create({
      data: { title, content },
      select: {
        postId: true,
        title: true,
        content: true,
      },
    });

    return res.status(201).json({ post });
  } catch {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

/** 게시글 목록 조회 API **/
router.get("/", async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    select: {
      postId: true,
      title: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc", // 작성 날짜 기준으로 내림차순 정렬
    },
  });

  return res.status(200).json({ data: posts });
});

/** 게시글 수정 API **/

router.put("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const post = await prisma.posts.findUnique({
    where: { postId: +postId },
  });

  if (!post) {
    return res
      .status(404)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  }

  const edit = await prisma.posts.update({
    data: { title, content },
    where: {
      postId: +postId,
    },
    select: {
      postId: true,
      title: true,
      content: true,
    },
  });

  return res.status(200).json({ edit });
});

/** 게시글 삭제 API **/

router.delete("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await prisma.posts.findUnique({
      where: { postId: +postId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }

    await prisma.posts.delete({
      where: {
        postId: +postId,
      },
    });

    return res.status(200).json({ data: "success" });
  } catch {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

export default router;
