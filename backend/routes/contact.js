const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
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

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, status } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      status,
    });

    await contact.save();
    res.status(201).json({ message: "お問い合わせを送信しました" });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.get("/", authenticationToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.get("/:id", authenticationToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "お問い合わせを見つけません" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.put("/:id", authenticationToken, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "お問い合わせを見つけません" });
    }

    res.status(201).json({ message: "対応状態を変更しました", contact });
  } catch (err) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

router.delete("/:id", authenticationToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "お問い合わせを見つけません" });
    }

    res.status(201).json({ message: "お問い合わせを削除しました" });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});
module.exports = router;
