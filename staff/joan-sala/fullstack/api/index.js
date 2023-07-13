//CREACIÓN DE UN MINISERVIDOR
const express = require('express') //Librería/framework/paquete para montar un mini servidor  
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const context = require('./logic/context')
const registerUser = require('./logic/registerUser')
const authenticateUser = require('./logic/authenticateUser')
const retrieveUser = require('./logic/retrieveUser')
const createPost = require('./logic/createPost')
const updatePost = require('./logic/updatePost')
const deletePost = require('./logic/deletePost')
const retrievePost = require('./logic/retrievePost')
const retrievePosts = require('./logic/retrievePosts')
const cors = require('cors')

const { MongoClient } = mongodb

const client = new MongoClient("mongodb://127.0.0.1:27017")

client.connect()
    .then((connection) => {
        context.users = connection.db('data').collection('users')
        context.posts = connection.db('data').collection('posts')

        const api = express()

        const jsonBodyParser = bodyParser.json() //devuelve en formato jsonpara recoger cualquier cosa

        api.use(cors()) //cargar función cors , añadir cabecera 

        //end point 01, proceso en la ruta raiz, controlador    
        api.get('/', (req, res) => { //htp://localhost:9000/
            res.send('hola mundo')
        })

        //end point EJEMPLE
        api.get('/search', (req, res) => {
            const q = req.query.q

            res.send(`You requested me to search: ${q}`)
        })

        //end point 02 REGISTER USER
        api.post('/users', jsonBodyParser, (req, res) => { //req:request=petición | res:respuesta si va bien o no
            //debugger 
            const { name, email, password } = req.body

            try {  //intenta hacer ésto
                registerUser(name, email, password)
                    .then(() => { res.status(201).send() }) //devuelve únicamente una infirmacióon 
                    .catch((error) => res.status(400).json({ error: error.message }))

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        //end point 03 AUTHENTICATE USER  aclarar que es author
        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { email, password } = req.body //petición por medio de insomnia

            try {
                authenticateUser(email, password)
                    .then(userId => { res.json(userId) })
                    .catch((error) => res.status(400).json({ error: error.message }))

            } catch (error) {
                res.status(400).json({ error: error.message }) // para mostrar sólo el 'message' del error
            }
        })
        
        //end point 04 RETRIEVE USER
        api.get('/users', (req, res) => {
            try {
                const { authorization } = req.headers
                const userId = authorization.slice(7)

                retrieveUser(userId)
                    .then(user => res.json(user))
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })
        
        //end point 05 CREATE POST POST
        api.post('/posts', jsonBodyParser, (req, res) => {

            try {
                const { image, text } = req.body
                const { authorization } = req.headers

                const userId = authorization.slice(7)

                createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })
        
        //end point 06 UPDATE POST
        api.patch('/posts/:postId',jsonBodyParser, (resp, res)=>{
            try{
                const { authorization } = req.headers
                const userId = authorization.slice(7)

                const { postId } = req.params
                const { image, text } = req.boby

                updatePost(userId, postId, image, text)
                .then(()=> res.status(204).send())
                .catch(error=> res.status(400).json({error:error.message}))
            }catch(error){
                res.status(400).json({error: error.message})
            }
        })
        
        //end point 07 DELETE POST
        api.delete('/posts/:postId', (req, res)=>{
            try{
                const { postId } = req.params
                const userId = req.headers.authorization.slice(7)

                deletePost(userId, postId)
                .then(()=> res.send())
                .catch(error=> res.status(400).json({error:error.message}))
            }catch(error){
                res.status(400).json({error: error.message})
            }
        })

        //end point 08 RETRIEVE POST
        api.get('/post', (req, res) => {
            try {
                const userId = req.headers.authorization.slice(7)
                const { postId } = req.params

                retrievePost(userId, postId)
                    .then(() => res.send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

         //end point 09 RETRIEVE POSTS
         api.get('/posts', (req, res) =>{
            try{
                const { authorization } = req.headers
                const userId = authorization.slice(7)
                
                retrievePosts(userId)
                .then(posts=> res.json(posts))
                .catch(error=> res.status(400).json({error:error.message}))
            }catch(error){
                res.status(400).json({error: error.message})
            }
        })


        api.listen(9000, () => console.log('API Funciona en el puerto 9000'))
    })