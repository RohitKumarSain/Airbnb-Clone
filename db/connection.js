const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
let database = "mongodb+srv://<username>:<password>@mongodb.4yj6vft.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
// I Don't show username and password because of privacy

mongoose.connect(database).then(() => {
    console.log('connection ')
}).catch((e) => {
    console.log("not conntct")
})




