import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));


// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

const create = async (post) => {
    await db.read();
    db.data = db.data || { posts: [] }
    db.data.posts.push(post)
    await db.write()
    return post;
}

const get = async (id) => {
    await db.read();
    db.data = db.data || { posts: [] }
    return db.data.posts.find(post => post.id === id)
}
const remove = async (id) => {
    await db.read();
    db.data = db.data || { posts: [] }
    db.data.posts = db.data.posts.filter(post => post.id !== id)
    await db.write()
}

const update = async (post) => {
    await db.read();
    db.data = db.data || { posts: [] }
    db.data.posts.forEach(item => {
        if(item.id === post.id){
            Object.assign(item, post);
        }
    })
    await db.write()
    return await get(post.id)
}

const getAll = async () => {
    await db.read();
    db.data = db.data || { posts: [] }
    return db.data.posts;
}
export {create, get, remove, update, getAll}