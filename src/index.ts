import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import chalk from 'chalk'
import { error } from '@pronix/hyper-flow'

const app = express()
const PORT: number = config.get("port")
const isProd = process.env.NODE_ENV === 'production'

if (typeof PORT !== 'number') throw error(`port error`, 2)

app.use(bodyParser.json())

app.post('/webhook', (req, res) => {  
 
    const body = req.body;
  
    if (body.object === 'page') {
  
      body.entry.forEach((entry: any) => {
  
        const webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
  
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }  
})


app.listen(PORT || 3500, () => {
    console.log(`
[ 🚀 ]-[ ${ chalk.blueBright.bold(`server has been started`) } ]

[ ${ chalk.redBright.bold(`PORT:`) } ${ chalk.greenBright.bold.italic(PORT) } ]
[ ${ chalk.redBright.bold`mode:` } ${ isProd && chalk.greenBright.bold.italic`production` || chalk.greenBright.bold.italic`development` } ]
    `)
})