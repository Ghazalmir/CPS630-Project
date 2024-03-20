const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

const profileRoutes = require('./endpoints/profile'); 

app.use('/api/profile', profileRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
