import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import superheroesRouter from './src/routes/superheroesRoutes.mjs';

const app = express();
app.use(express.json());

// Conectar base de datos
connectDB();

// Rutas
app.use('/superheroes', superheroesRouter);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
