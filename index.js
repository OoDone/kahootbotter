var amount = 20;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const question1 = () => {
  return new Promise((resolve, reject) => {
    readline.question('game id: ', (answer) => {
      global.name = answer;
      resolve()
    })
  })
}
const question2 = () => {
  return new Promise((resolve, reject) => {
    readline.question('amount of bots(20 max):  ', (answer) => {
      if (answer < 21) {
        global.amount = answer;
      } else {
        global.amount = 20;
      }
      resolve()
    })
  })
}
const main = async () => {
  await question1()
  await question2()
  readline.close()
  require('./cluster');
}

main()

