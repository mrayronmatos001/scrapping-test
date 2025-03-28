import express from 'express';
import routes from './routes/routes'

const app = express();
const port = 3000;

app.use(express.json());
app.set('json spaces', 2);
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});