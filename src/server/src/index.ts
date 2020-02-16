import 'reflect-metadata'
import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'
import generateSchema from './schema'
import { configureContainer } from './container'

async function start(): Promise<void> {
    configureContainer()

    const schema = await generateSchema()

    const server = new ApolloServer({ schema })
    const app = new Koa()
    const router = new Router()

    server.applyMiddleware({ app })

    //// Middlewares
    app.use(json())
    app.use(logger())
    app.use(bodyParser())

    //// Routes
    app.use(router.routes()).use(router.allowedMethods())

    app.listen(3001, () => {
        console.log('Koa started')
    })
}

start()
