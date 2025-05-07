const db = require('../config/db');

exports.getAllPosts = async (req, res) => {
    try{
        const[posts] = await db.query('SELECT * FROM posts');
        res.json(posts);
    }catch(err){
        res.status(500).json({error:err.message});
    }

};

exports.getPostById = async (req, res) =>{
    try{
        const [post] = await db.query('SELECT * FROM posts WHERE id = ?',[req.params.id]);
        if(post.length === 0){
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post[0]);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};



exports.createPost = async (req, res) => {
    try {
        const { title, description, image, category_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO posts (title, content, image, category_id) VALUES (?, ?, ?, ?)',
            [title, description, image, category_id]
        );
        res.status(201).json({ id: result.insertId, title, description, image, category_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updatePost = async (req, res) => {
    try {
      const { title, content,image,category_id } = req.body;
      const [result] = await db.query('UPDATE posts SET title = ?, content = ?,image =?, category_id=?  WHERE id = ?', [title, content,image, category_id, req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.deletePost = async(req,res) =>{
    try{
        const [result] = await db.query('DELETE FROM posts WHERE id=?',[req.params.id]);
        if(result.affectedRows === 0){
            return res.status(404).json({message:'Post not found'});
        }
        res.json({message:'Post deleted successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.getPosts = async(req,res)=>{
    const {category}=req.query;

    try {
        let query = `
          SELECT posts.*
          FROM posts
          
        `;
        let params = [];
      
        if (category && category !== 'All') {
          query += 'JOIN categories ON posts.category_id = categories.category_id WHERE categories.category_name = ?';
          params.push(category);
        }
      
        const [rows] = await db.query(query, params);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
};