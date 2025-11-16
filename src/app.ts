import express from "express";
import cors from "express";
import usersRouter from './routes/user.routes';
import recipeRouter from './routes/recipe.routes';

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/recipes',recipeRouter);
app.use('/api/users',usersRouter);



app.listen(PORT, () => {
    console.log("App is running");
})