import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import fs from "fs";

// @desc Create a employee
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    res.status(409);
    throw new Error("User with that email already");
  }

  const newUser = await User.create({ firstName, lastName, email });

  res.status(201).json(newUser);
});

// @desc Create multiple employee
// @route POST /api/users
// @access Public
const createMultiUser = asyncHandler(async (req, res) => {
  const existingRows = await User.count();
  await User.bulkCreate(req.body.userList, {
    ignoreDuplicates: true,
  });
  const totalRows = await User.count();
  const inserted = totalRows - existingRows;
  const failed = req.body.count - inserted;

  //Remove File
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  res.status(201).json({
    message: `${inserted} employees added and failed to insert ${failed} employees`,
  });
});

// @desc Get 5 users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const size = 5;
  const page = Number(req.query.page) || 1;
  const { count, rows } = await User.findAndCountAll({
    where: {},
    limit: size,
    offset: size * (page - 1),
  });

  res.status(201).json({
    users: rows,
    page: page,
    pages: Math.ceil(count / size),
  });
});

export { createUser, createMultiUser, getUsers };
