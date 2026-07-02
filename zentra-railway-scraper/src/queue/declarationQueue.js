const PQueue = require('p-queue').default;
const declarationQueue = new PQueue({ concurrency: 3 });
const addToQueue = (fn) => {
  return declarationQueue.add(async () => {
    await fn();
    await new Promise(resolve => 
      setTimeout(resolve, 
        Math.floor(Math.random() * 60000) + 30000
      )
    );
  });
};
module.exports = { declarationQueue, addToQueue };
