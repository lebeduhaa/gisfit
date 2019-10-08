import { APP } from './constants';

export const parseError = (errors: any, controlName: string): string => {
  const error = Object.keys(errors)[0];

  switch (error) {
    case APP.controlErrors.required:
      return `${APP.controlNames[controlName]} is required field!`;
    case APP.controlErrors.minLength:
      return `${APP.controlNames[controlName]} should has at least ${errors[APP.controlErrors.minLength].requiredLength} characters!`;
    case APP.controlErrors.match:
      return `Passwords don't match!`;
  }
};

export const flatEquality = (firstObject, secondObject) => {
  let result = true;

  Object.keys(firstObject).forEach(key => {
    if (firstObject[key] !== secondObject[key]) {
      if ((!!firstObject[key] && typeof secondObject[key] === 'undefined') || (firstObject[key] && secondObject[key])) {
        result = false;
      }
    }
  });

  return result;
};

export const collectChanges = (firstObject, secondObject) => {
  const result = {};

  Object.keys(firstObject).forEach(key => {
    if (firstObject[key] !== secondObject[key]) {
      if ((!!firstObject[key] && typeof secondObject[key] === 'undefined') || (firstObject[key] && secondObject[key])) {
        result[key] = firstObject[key];
      }
    }
  });

  return result;
};

export const getClosestByClassName = (element: HTMLElement, className: string): HTMLElement => {
  if (element.parentElement.classList.contains(className)) {
    return element.parentElement;
  } else {
    return getClosestByClassName(element.parentElement, className);
  }
};
