import {open} from "lmdb";
import {withExtensions} from "./index.js";

const testFunction = (db) => {}

const db = withExtensions(open("test.db",{useVersions:true}),{testFunction}),
    child = db.openDB("child");

test("extended",() => {
    expect(typeof(db.testFunction)).toEqual("function");
    expect(typeof(child.testFunction)).toEqual("function");
})