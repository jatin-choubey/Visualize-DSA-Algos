export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  bubbleSort(array, auxiliaryArray, animations);

  return animations;
}

function bubbleSort(mainArray, auxiliaryArray, animations) {
  const n = auxiliaryArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);

      animations.push([j, j + 1]);

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, auxiliaryArray[j + 1]]);

        animations.push([j + 1, auxiliaryArray[j]]);

        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
    }
  }
}
