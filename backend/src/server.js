require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/formularios', formRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));