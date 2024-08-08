// Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

//Routes Middleware
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// ENVIRONMENT SETUP
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
	origin: ['https://blog-website-blue-kappa.vercel.app',
		'https://blog-website-git-master-reggys-projects-f2037f72.vercel.app',
		'https://blog-website-3uc14i4o8-reggys-projects-f2037f72.vercel.app',
		'http://localhost:5173'
	],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"));

// ROUTES
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};