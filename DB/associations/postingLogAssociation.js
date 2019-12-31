export default db => {
    db.post.belongsTo(db.users,{
        foreignKey:'uid'
    })
}