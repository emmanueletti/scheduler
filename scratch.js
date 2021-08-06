const back = (prev) => {
  return prev.filter((element, index) => index !== prev.length - 1);
};

const mode = [1,2,3,4]
const forward = (newMode) => {
  return [...mode, newMode]
};


console.log(back([1,2,3,4,5,6]));
console.log(forward(55));