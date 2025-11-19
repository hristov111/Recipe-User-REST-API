import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "",
});

router.post("/send-test-email", async (req, res) => {});
