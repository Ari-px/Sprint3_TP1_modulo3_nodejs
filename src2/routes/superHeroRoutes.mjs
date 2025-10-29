import express from 'express';
import { Superheroe } from '../models/superheroeModel.mjs';

const router = express.Router();

// 📍 GET: obtener todos los superhéroes
router.get('/', async (req, res) => {
  try {
    const heroes = await Superheroe.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los superhéroes', error });
  }
});

// 📍 POST: crear un nuevo superhéroe
router.post('/', async (req, res) => {
  try {
    const nuevoHeroe = new Superheroe(req.body);
    const guardado = await nuevoHeroe.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el superhéroe', error });
  }
});

// 📍 PUT: actualizar un superhéroe por ID
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Superheroe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devuelve el nuevo documento actualizado
    );
    if (!actualizado) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el superhéroe', error });
  }
});

// 📍 DELETE: borrar un superhéroe por ID
router.delete('/:id', async (req, res) => {
  try {
    const borrado = await Superheroe.findByIdAndDelete(req.params.id);
    if (!borrado) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json({ message: 'Superhéroe eliminado', superheroe: borrado });
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar el superhéroe', error });
  }
});

// 📍 DELETE: borrar un superhéroe por nombre
router.delete('/nombre/:nombre', async (req, res) => {
  try {
    const borrado = await Superheroe.findOneAndDelete({ nombre: req.params.nombre });
    if (!borrado) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json({ message: 'Superhéroe eliminado', superheroe: borrado });
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar por nombre', error });
  }
});

export default router;
