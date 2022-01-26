import {create, get, remove, update} from './db.js'
/**
 * Post Object:
 * {
 *  id: number,
 *  name: string,
 *  text: string,
 *  date: Date,
 *  category: string
 * }
 * 
 */
create({
    id: new Date().valueOf(),
    name: 'Post 1',
    text: 'This is my first post',
    date: new Date(),
    category: 'Hat'
}).then((post) => {
    return get(post.id)
}).then(post => {
    console.log(post)
    return post;
}).then((post) => {
    return update({
        id: post.id,
        text: 'This is updated text',
        date: new Date()
    })
}).then(post => {
    console.log(post)
})
