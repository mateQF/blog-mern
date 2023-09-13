const Post = require("../models/Post.js");
const fs = require("fs");

async function createPost(req, res) {
  try {
    const { title, content, summary } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    await fs.renameSync(path, newPath);

    const postCreated = await Post.create({
      title,
      summary,
      content,
      file: newPath,
      author: req.user.id,
    });
    res.status(201).json(postCreated);
  } catch (error) {
    res.status(500).json({
      message: `Error while creating the post [CREATE_POST] ${error.message}`,
    });
  }
}

async function getAllPosts(_req, res) {
  try {
    const allPosts = await Post.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching all posts [GET_ALL_POSTS] ${error.message}`,
    });
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;
    const postFound = await Post.findById(id).populate("author", ["username"]);
    if (!postFound) {
      res.status(404).json({ message: "Post not found." });
    } else {
      res.status(200).json(postFound);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching a post [GET_POST] ${error.message}`,
    });
  }
}

async function updatePost(req, res) {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      await fs.renameSync(path, newPath);
    }

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found." });
    }
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(req.user.id);
    if (!isAuthor) {
      return res
        .status(400)
        .json({ message: "Only the author can update this post" });
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      file: newPath ? newPath : postDoc.file,
    });

    res.status(200).json(postDoc);
  } catch (error) {
    res.status(500).json({
      message: `Error while updating a post [UPDATE_POST] ${error.message}`,
    });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const postToDelete = await Post.findByIdAndDelete(id);

    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: `Error while deleting a post [DELETE_POST] ${error.message}`,
    });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
