export function findParentNodeByName(target, name) {
  if (target.nodeName !== name) {
    target = findParentNodeByName(target.parentElement, name);
  }

  return target;
}

export default findParentNodeByName;
