const mongoose = require('mongoose');


const dbConnection = async() =>{

    try {
        await mongoose.connect('mongodb+srv://mean_user:RKAYHHJK57FPW5Du@cluster0.epodz.mongodb.net/test?', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD')
    }

}

module.exports = {
    dbConnection
}