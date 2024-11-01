const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 2200;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}));

app.use('/api/auth', authRoutes);
app.get('/', async (req, res) => {
  res.json({ message: `server is running at ${PORT}` })
})
connectDB().then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
})

