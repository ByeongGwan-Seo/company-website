const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");
const jwt = require("jsonwebtoken");

/**
 * @route POST /signup
 * @desc ユーザー登録
 * @param {string} username - ユーザー名
 * @param {string} password - パスワード
 * @return {object} 成功メッセージまたはエラーメッセージ
 *
 * このエンドポイントは新しいユーザーを登録します。
 * ユーザー名は一意でなければならず、パスワードはハッシュ化されて保存されます。
 * 既存のユーザー名で登録しようとすると、エラーメッセージが返されます。
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 *
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(401).json({
        message: "登録されてないIDです",
        remainingAttempts: 5 - user.failedLoginAttempts,
      });
    }

    if (!user.isActive) {
      res.status(401).json({ message: "deactivated user. ask administrator" });
    }

    if (user.isLoggedIn) {
      res.status(401).json({
        message: "logged in already",
        remainingAttempts: 5 - user.failedLoginAttempts,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date();

      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({
          message: "Incorrect password entered 5 times. Account deactivated",
        });
      }
      await user.save();
      return res.status(401).json({
        message: "password is incorrect",
        remainingAttempts: 5 - user.failedLoginAttempts,
      });
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true;

    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = response.data.ipAddress;
      user.ipAddress = ipAddress;
    } catch (error) {
      console.log(
        "error occurred when bring ip address from user",
        error.message
      );
    }

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const isProd = process.env.NODE_ENV === "production";

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("token here: ", token);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });

    console.log(user);
  } catch (error) {
    console.log("server error: ", error.message);
    res.status(500).json({ message: "server error has occurred" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token?", token);

    if (!token) {
      return res.status(400).json({ message: "이미 로그아웃된 상태입니다." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (error) {
      console.log("토큰 검증 오류: ", error.message);
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ message: "로그아웃되었습니다." });
  } catch (error) {
    console.log("로그아웃 오류: ", error.message);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/delete/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "cannot find user" });
    }
    res.json({ message: "user deleted!" });
  } catch (error) {
    res.status(500).json({ message: "user deleted" });
  }
});

router.post("/verify-token", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      isValid: false,
      message: "トークンがありません",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isValid: true, user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ isValid: false, message: "有効なトークンではありません" });
  }
});
module.exports = router;
