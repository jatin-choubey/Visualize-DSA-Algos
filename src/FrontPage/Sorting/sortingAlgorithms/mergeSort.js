export function getMergeSortAnimations(array) {
  console.log("Main Array");
  for (let i = 0; i < array.length; i++) console.log(i + " -> " + array[i]);
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  console.log("Animations");
  for (let i = 0; i < animations.length; i++) console.log(animations[i]);

  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    console.log("Push in Animation " + i + " and " + j);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    console.log("Push in Animation " + i + " and " + j);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  // console.log("-----------------First array------------------------------");
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    console.log("Push in Animation " + i + " and " + i);

    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    console.log("Push in Animation " + i + " and " + i);

    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    console.log("Push in Animation " + k + " and " + auxiliaryArray[i]);

    mainArray[k++] = auxiliaryArray[i++];
  }
  // // console.log("-----------------Second Array------------------------------");
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    console.log("Push in Animation " + j + " and " + j);

    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    console.log("Push in Animation " + j + " and " + j);

    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    console.log("Push in Animation " + k + " and " + auxiliaryArray[j]);

    mainArray[k++] = auxiliaryArray[j++];
  }
}
