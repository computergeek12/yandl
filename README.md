# YANDL
YANDL lets you easily make a Discord bot.
## Example:
```js
const { Bot, Command } = require('yandl')
const myBot = new Bot('[token here]', '!')
const pingCmd = new Command(myBot, {
    name: 'ping',
    description: 'Pong!',
    run: (bot, msg, args) => {
        msg.send('Pong!')
    }
})
pingCmd.activate()
myBot.connect()
myBot.on('ready', async() => {
    await myBot.initUser()
    console.log('ready')
})
```