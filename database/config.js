const mongoose = require('mongoose');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const dbConnection = async () => {
    try{

        await mongoose.connect(process.env.DB_CNN);
        
        console.log('DB online');
    }
    catch (error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

module.exports = {
    dbConnection
}