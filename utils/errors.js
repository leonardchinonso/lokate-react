/**
 * This file holds the implementation for handling errors
 * */

export function catchErr(promise) {
  return promise.then((data) => [null, data]).catch((err) => [err]);
}
