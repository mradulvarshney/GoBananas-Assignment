import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]); 
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedPost, setSelectedPost] = useState(null); 
  const [open, setOpen] = useState(false); 

  // Fetching data from jsonplaceholder api
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data); // Set posts data
        setLoading(false); 
      })
      .catch((error) => {
        setError(error); 
        setLoading(false); 
      });
  }, []);

  // Filter posts based on search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show loader if data is still loading
  if (loading) return <Loader />;

  // Show error message if there is an error fetching data
  if (error) return <Alert severity="error">Error fetching posts</Alert>;

  // Handle card click to open dialog
  const handleCardClick = (post) => {
    setSelectedPost(post); // Set selected post
    setOpen(true); // Open dialog
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false); // Close dialog
    setSelectedPost(null); // Reset selected post
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Post List
      </Typography>
      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
      />
      <Grid container spacing={3}>
        {/* Map through filtered posts and display them in Grid items */}
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card onClick={() => handleCardClick(post)} style={{cursor: "pointer"}}> {/* Handle card click */}
              {/* Display a random image */}
              <CardMedia
                component="img"
                alt="Post Image"
                height="200"
                image={`https://picsum.photos/200/300?random=${post.id}`}
                title="Post Image"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom 
                  className="title"
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Dialog to display selected post in full screen */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedPost?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="p">
            {selectedPost?.body}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PostList;
