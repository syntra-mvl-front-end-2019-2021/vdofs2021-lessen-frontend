let resolveClick;
let rejectClick;

function promiseCallback(resolve, reject) {
  resolveClick = resolve;
  rejectClick = reject;
}

let newPromise = new Promise(promiseCallback);

newPromise
  .finally(
    function() {console.log('gedaan')}
  )
  .then(
    function(result) {console.log(result);}
  ).catch(
    function(error) {console.log('gevangen')}
  );

console.log(newPromise);

document.getElementById('btn-resolve').addEventListener('click', function() {
  resolveClick('btn clicked');
});

document.getElementById('btn-reject').addEventListener('click', function() {
  rejectClick(new Error('Error btn clicked'));
});

let anotherPromise = new Promise(function(resolve, reject) {
  resolve('joepie');
}).then(
  function(result) {
    console.log(result);
    return 'joepie * 2';
  }
)

// setTimeout(function() {
//   console.log('nu kom ik');
//   console.log(anotherPromise);
//   anotherPromise
//     .then(
//       function(result) {
//         console.log(result);
//       }
//   )
// }, 3000)

// let promiseOne = new Promise(function(resolve) {
//   setTimeout(function() {
//     resolve(1);
//   }, 1000);
// })
//   .then(function(result) {
//     console.log(result);
//     return new Promise(function(resolve, reject) {
//       setTimeout(function() {
//         resolve(2);
//         // reject(new Error(2));
//       }, 1000);
//     })
//   }).then(function(result) {
//     console.log(result);
//     return 3;
//     // return new Promise(resolve) {
//     //   resolve(3);
//     // }
//   }).then(function(result) {
//     console.log(result);
//     return 4;
//   })
//   .catch(function(error) {
//     console.log('error 1');
//     console.error(error);
//     return 5;
//   }).then(function(result) {
//     console.log(result);
//     // throw new Error('niet leuk');
//     return 6;
//   }).then(function(result) {
//     console.log(result);
//     return 7;
//   }).catch(function(error) {
//     console.log('error 2');
//     console.error(error);
//   });

Promise.any([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve,reject) => setTimeout(() => reject(new Error(3)), 1000))  // 3
]).then(function(results) {
  console.log(results);
}).catch(function(error) {
  console.error(error);
});
