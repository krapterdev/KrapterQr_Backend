const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
