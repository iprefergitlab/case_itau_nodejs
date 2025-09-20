const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const customerRoutes = require('./routes/customer.routes');
const errorHandler = require('./middlewares/error.middleware');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/customers', customerRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
