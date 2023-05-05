/*MIT License
Copyright 2023, AnyWhichWay, LLC and Simon Y. Blackwell

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function withExtensions(db,extensions) {
    Object.entries(extensions).forEach(([key,value]) => {
        if(typeof(db[key])==="function") {
            const f = db[key].bind(db);
            Object.defineProperty(db,key,{configurable:true,writable:true,value:function(...args) {
                    return value.call(this,f,...args);
                }})
        } else {
            Object.defineProperty(db,key,{configurable:true,writable:true,value});
        }
    })
    const openDB = db.openDB.bind(db);
    db.openDB = function(...args) {
        const childdb = openDB(...args);
        childdb.envdb = db;
        Object.entries(extensions).forEach(([key,value]) => {
            if(typeof(childdb[key])==="function") {
                const f = childdb[key].bind(childdb);
                Object.defineProperty(childdb,key,{configurable:true,writable:true,value:function(...args) {
                        return value.call(this,f,...args);
                    }})
            } else {
                Object.defineProperty(childdb,key,{configurable:true,writable:true,value});
            }
        })
        return childdb;
    }
    return db;
}

export {withExtensions}