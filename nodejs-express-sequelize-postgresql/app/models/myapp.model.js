module.exports = (sequelize, Sequelize) => {
    const MyApp = sequelize.define("my app", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return MyApp;
}