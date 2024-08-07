const Post = require('../models/Post');

module.exports.getPosts = (req, res) => {
    return Post.find({})
    .then(result => {
        return res.status(200).send({result});
    }).catch(err => { 
        return res.status(500).send({ message: 'Error finding posts' });
    });
}

module.exports.addPost = (req, res) => {

    const { title, content } = req.body;
    const author = req.user.id;

    let newPost = new Post({
        title,
        content,
        author
    })

    return newPost.save()
    .then(result => {
        res.status(201).send({
            message: 'Added Successfully', 
            result: result
        });
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to save the post' });
    })
}

module.exports.getPostById = (req, res) => {
    return Post.findById(req.params.postId)
    .then(result => {
        return res.status(200).send({result});
    })
    .catch(err => {
        return res.status(500).send({ message: 'Error finding posts' });
    })
}

module.exports.getMyPosts = (req, res) => {

    return Post.find({ author: req.user.id })
    .then(result => {
        return res.status(200).send({result});
    })
    .catch(err => {
        return res.status(500).send({ message: 'Error finding posts' });
    })
}

module.exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    let updatedPost = {
        title,
        content,
        author
    }

    return Post.findByIdAndUpdate(req.params.postId, updatedPost, { new: true })
    .then(result => {
        if (!result) {
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ message: 'Updated Successfully' });
        }
    }) 
    .catch(err => {
        return res.status(500).send({ message: 'Failed to update the post' });
    })
}

module.exports.deletePost = (req, res) => {
    return Post.findByIdAndDelete(req.params.postId)
    .then(result => {
        if (!result) {
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ message: 'Deleted Successfully' });
        }
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to delete the post' });
    })
}

module.exports.deletePostByAdmin = (req, res) => {
    return Post.findByIdAndDelete(req.params.postId)
    .then(result => {
        if (!result) { 
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ message: 'Deleted Successfully' });
        }
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to delete the post' });
    })
}

module.exports.commentPost = (req, res) => {
    const { comment } = req.body;
    const userId = req.user.id;

    return Post.findByIdAndUpdate(req.params.postId, 
        { $push: { comments: { userId, comment } } }, 
        { new: true })
    .then(result => {
        if (!result) {
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ 
                message: 'Comment added successfully',
                result: result});
        }
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to add comment' });
    }) 
}

module.exports.getComments = (req, res) => {
    return Post.findById(req.params.postId)
    .then(result => {
        if (!result) {
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ comments: result.comments });
        }
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to get comments' });
    }) 
}

module.exports.deleteComment = (req, res) => {
    return Post.findByIdAndUpdate(req.params.postId, 
        { $pull: { comments: { _id: req.params.commentId } } }, 
        { new: true })
    .then(result => {
        if (!result) {
            return res.status(404).send({ error: 'Post not found' });
        } else {
            return res.status(200).send({ message: 'Comment deleted successfully' });
        }
    })
    .catch(err => {
        return res.status(500).send({ message: 'Failed to delete comment' });
    })
}