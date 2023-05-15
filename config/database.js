const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost/todo-list')
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error(err)); 