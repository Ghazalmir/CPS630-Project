const express = require('express');
const app = express();
const port = 8080;

const profileRoutes = require('./endpoints/profile'); 

app.use('/api/profile', profileRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
