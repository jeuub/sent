const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

module.exports = {
  newNote: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in");
    }

    let noteValue = {
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
    };
    ability = await models.Note.findOne({ author: user.id });
    if (ability) {
      throw new Error("Error creating note");
    }
    note = await models.Note.create(noteValue);
    return note;
  },

  signUp: async (parent, { username, vkid }, { models }) => {
    try {
      const user = await models.User.create({
        username,
        vkid,
      });

      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);

      throw new Error("Error creating account");
    }
  },

  signIn: async (parent, { username, vkid }, { models }) => {
    const user = await models.User.findOne({
      $or: [{ vkid }, { username }],
    });

    if (!user) {
      throw new AuthenticationError("Check your email or username");
    }

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  },

  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in");
    }

    let noteCheck = await models.Note.findById(id);
    console.log(noteCheck);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        {
          new: true,
        }
      );
    } else {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        {
          new: true,
        }
      );
    }
  },

  hasAccount: async (parent, { vkid }, { models }) => {
    const user = await models.User.findOne({
      vkid,
    });
    return !!user;
  },
};
