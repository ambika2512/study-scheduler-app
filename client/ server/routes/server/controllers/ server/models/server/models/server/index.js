const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/tasks', taskRoutes);
app.use('/api/playlists', playlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
