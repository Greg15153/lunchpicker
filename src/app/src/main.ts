import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import register from '@react-ssr/nestjs-express/register'
import { AppModule } from './app.module'
;(async (): Promise<void> => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    // register `.tsx` as a view template engine
    await register(app)

    app.listen(3000, async () => {
        console.log(`> Ready on http://localhost:3000`)
    })
})().catch(ex => {
    console.log(ex)
})
