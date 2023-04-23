function withExtensions(db,extensions) {
    Object.entries(extensions).forEach(([key,value]) => {
        if(typeof(db[key])==="function") {
            const f = db[key].bind(db);
            Object.defineProperty(db,key,{configurable:true,value:function(...args) {
                    return value.call(this,f,...args);
                }})
        } else {
            Object.defineProperty(db,key,{configurable:true,value});
        }
    })
    const openDB = db.openDB.bind(db);
    db.openDB = function(...args) {
        const childdb = openDB(...args);
        childdb.envdb = db;
        Object.entries(extensions).forEach(([key,value]) => {
            if(typeof(childdb[key])==="function") {
                const f = childdb[key].bind(childdb);
                Object.defineProperty(childdb,key,{configurable:true,value:function(...args) {
                        return value.call(this,f,...args);
                    }})
            } else {
                Object.defineProperty(childdb,key,{configurable:true,value});
            }
        })
        return childdb;
    }
    return db;
}

export {withExtensions}