import {z} from 'zod'
let nameSchema=z.string({message:"custom message"});
nameSchema.parse(1)
console.log('healooo',)
