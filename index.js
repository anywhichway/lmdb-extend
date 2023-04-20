function withExtensions(db,extensions) {
    Object.entries(extensions).forEach(([key,value]) => {
        Object.defineProperty(db,key,{configurable:true,value});
    })
    const openDB = db.openDB.bind(db);
    db.openDB = function(...args) {
        const db = openDB(...args);
        Object.entries(extensions).forEach(([key,value]) => {
            Object.defineProperty(db,key,{configurable:true,value});
        })
        return db;
    }
    return db;
}

export {withExtensions}