import express from "express";
// * 왜 여기 {Router} 로 하면 오류나는 거지... 궁금하당
import Router from "./routes/posts.router.js";

// const express = require('express');
const app = express();
const PORT = 3449;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "5주차 테스트 페이지입니다." });
});

app.use("/api/posts", Router);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
