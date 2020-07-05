require('dotenv').config()
const {TOKEN, OWNERS} = process.env
import BotClient from './client/BotClient'

const client: BotClient = new BotClient({ token: TOKEN, owners: OWNERS})

client.start()