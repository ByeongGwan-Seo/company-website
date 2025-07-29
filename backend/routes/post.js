const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "トークンがありません" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "有効なトークンではありません" });
  }
};

router.post("/", authenticationToken, async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const latestPost = await Post.findOne().sort({ number: -1 });
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const post = new Post({
      number: nextNumber,
      title,
      content,
      fileUrl,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.get("/", authenticationToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.get("/:id", authenticationToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "投稿した内容を見つけません" });
    }

    // let ip;
    // try {
    //   const response = await axios.get("https://api.ipify.org?format=json");
    //   ip = response.data.ip;
    // } catch (error) {
    //   console.log(
    //     "error occurred when bring ip address from user",
    //     error.message
    //   );
    //   ip = req.ip;
    // }

    // const userAgent = req.headers["user-agent"];
    // const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    // const hasRecentView = post.viewLogs.some(
    //   (log) =>
    //     log.ip === ip &&
    //     log.userAgent === userAgent &&
    //     new Date(log.timestamp) > oneDayAgo
    // );

    // if (!hasRecentView) {
    //   post.views += 1;
    //   post.viewLogs.push({
    //     ip,
    //     userAgent,
    //     timestamp: new Date(),
    //   });
    //   await post.save();
    // }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.put("/:id", authenticationToken, async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const post = await Post.findByIdAndUpdate(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ message: "投稿した掲示物を見つけませんでした" });
    }

    post.title = title;
    post.content = content;
    post.fileUrl = fileUrl;
    post.updatedAt = Date.now();

    await post.save();
    res.status(201).json({ message: "修正しました", post });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.delete("/:id", authenticationToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ message: "投稿した掲示物を見つけませんでした" });
    }

    res.status(201).json({ message: "掲示物を削除しました" });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

module.exports = router;
