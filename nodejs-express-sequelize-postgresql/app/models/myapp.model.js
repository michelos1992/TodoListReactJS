module.exports = (sequelize, Sequelize) => {
    const MyApp = sequelize.define("myapp", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        isCompleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return MyApp;
}