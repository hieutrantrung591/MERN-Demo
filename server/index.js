require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-demo.vypvktx.mongodb.net/mern-demo?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

const host = '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
  console.log(`Server running on port ${port}`);
});
