const models = require('./models');

models.sequelize.sync({alter:true}).then(function(){
    process.exit();
});



