function withExtensions(db,extensions) {
    Object.entries(extensions).forEach(([key,value]) => {
        if(typeof(db[key])==="function") {
            const f = db[key].bind(db);
            Object.defineProperty(db,key,{configurable:true,value:function(...args) {
                return value(f,...args);
            }})
        } else {
            Object.defineProperty(db,key,{configurable:true,value});
        }
    })
    const openDB = db.openDB.bind(db);
    db.openDB = function(...args) {
        const db = openDB(...args);
        Object.entries(extensions).forEach(([key,value]) => {
            if(typeof(db[key])==="function") {
                const f = db[key].bind(db);
                Object.defineProperty(db,key,{configurable:true,value:function(...args) {
                        return value(f,...args);
                    }})
            } else {
                Object.defineProperty(db,key,{configurable:true,value});
            }
        })
        return db;
    }
    return db;
}

export {withExtensions}