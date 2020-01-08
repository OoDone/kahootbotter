var amount = 4;
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

const main = async () => {
  await question1()
  readline.close()
  require('./cluster');
}

main()

