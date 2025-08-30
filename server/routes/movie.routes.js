import express from "express";
import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import Rating from "../models/Rating.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ✅ Utility to safely parse numbers
const parseNum = (val, def) => {
  const n = Number(val);
  return Number.isNaN(n) || n <= 0 ? def : n;
};

// ------------------- List movies (search, genre filter & pagination) -------------------
router.get("/", async (req, res, next) => {
  try {
    const { q = "", genre = "", page = 1, limit = 24 } = req.query;

    const pageNum = parseNum(page, 1);
    const limitNum = parseNum(limit, 24);

    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (genre) filter.genres = genre; // 🔹 match against array field "genres"

    const docs = await Movie.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json(docs);
  } catch (e) {
    next(e);
  }
});

// ------------------- Get single movie with rating data -------------------
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const m = await Movie.findById(req.params.id);
    if (!m) return res.status(404).json({ message: "Movie not found" });

    res.json(m);
  } catch (e) {
    next(e);
  }
});

// ------------------- Rate (create/update) -------------------
router.post("/:id/rate", auth, async (req, res, next) => {
  try {
    const { stars } = req.body;

    if (![1, 2, 3, 4, 5].includes(stars)) {
      return res.status(400).json({ message: "Stars must be between 1–5" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Either update or insert rating
    const existing = await Rating.findOne({ movie: movie._id, user: req.user.id });
    if (existing) {
      existing.stars = stars;
      await existing.save();
    } else {
      await Rating.create({ movie: movie._id, user: req.user.id, stars });
    }

    // Recompute aggregate each time rating changes
    const agg = await Rating.aggregate([
      { $match: { movie: movie._id } },
      { $group: { _id: "$movie", avg: { $avg: "$stars" }, count: { $sum: 1 } } }
    ]);

    const { avg = 0, count = 0 } = agg[0] || {};
    movie.avgRating = Math.round(avg * 10) / 10;
    movie.ratingCount = count;
    await movie.save();

    res.json({ avgRating: movie.avgRating, ratingCount: movie.ratingCount });
  } catch (e) {
    next(e);
  }
});

export default router;
