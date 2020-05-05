const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,{
       useCreateIndex:true,
       useUnifiedTopology:true,
       useNewUrlParser:true,
       useFindAndModify:false
})
.then(()=>console.log('Successfully conected to the MongoDB database'))
.catch(error=>console.error('There was a problem trying to conect to MongoDB'+error))