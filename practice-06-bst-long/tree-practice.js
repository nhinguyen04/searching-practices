const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');

function findMinBST (rootNode) {
  // most left
  let minNode = rootNode;
  while (true) {
    if (!minNode.left) return minNode.val;
    else minNode = minNode.left;
  }
}

function findMaxBST (rootNode) {
  let maxNode = rootNode;
  while (true) {
    if (!maxNode.right) return maxNode.val;
    else maxNode = maxNode.right;
  }
}

function findMinBT (rootNode) {
  // go through entire tree
  let minNode = rootNode;

  // stack
  let stack = [rootNode];

  while (stack.length > 0) {
    let current = stack.pop();
    if (current.val < minNode.val) minNode = current;

    // push left and right if not empty
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return minNode.val;
}

function findMaxBT (rootNode) {
  let maxNode = rootNode;

  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();
    if (current.val > maxNode.val) maxNode = current;

    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return maxNode.val;
}

function getHeight (rootNode) {
  if (!rootNode) return -1;

  let maxHeight = 0;

  if (rootNode.left) {
    let leftHeight = getHeight(rootNode.left);
    if (leftHeight >= maxHeight) maxHeight = leftHeight + 1;
  }

  if (rootNode.right) {
    let rightHeight = getHeight(rootNode.right);
    if (rightHeight >= maxHeight) maxHeight = rightHeight + 1;
  }

  return maxHeight;
}

function balancedTree (rootNode) {

  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();
    const leftHeight = getHeight(current.left);
    const rightHeight = getHeight(current.right);

    if (leftHeight === -1 && rightHeight > 0) return false;
    if (rightHeight === -1 && leftHeight > 0) return false;
    if (rightHeight - leftHeight > 1) return false;
    if (leftHeight - rightHeight > 1) return false;

    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return true;
}

function countNodes (rootNode) {
  let count = 0;

  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();
    count++;

    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return count;
}

function getParentNode (rootNode, target) {
  if (rootNode.val === target) return null;

  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();

    if (current.left) {
      if (current.left.val === target) return current;
      stack.push(current.left);
    }
    if (current.right) {
      if (current.right.val === target) return current;
      stack.push(current.right);
    }
  }

  return undefined;
}

function getNode (rootNode, target) {
  if (rootNode.val === target) return rootNode;

  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();
    if (current.val === target) return current;

    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }

  return undefined;
}

function inOrderPredecessor (rootNode, target) {
  let result = [];
  inOrderTraversal(rootNode, result)

  let indexOfTarget = result.indexOf(target);
  if (indexOfTarget === 0) {
    return null;
  } else if (indexOfTarget === -1) {
    return false;
  } else {
    return result[indexOfTarget - 1];
  }
}

function inOrderTraversal (rootNode, result) {
  let currentNode = rootNode;
  // base
  if (!currentNode) {
    return;
  }

  inOrderTraversal(currentNode.left, result);
  result.push(currentNode.val);
  inOrderTraversal(currentNode.right, result);
}


function deleteNodeBST(rootNode, target) {

  // Do a traversal to find the node. Keep track of the parent
  let parentNode = getParentNode(rootNode, target);
  let targetNode;

  if (!parentNode) targetNode = getNode(rootNode, target);
  else {
    if (parentNode.left) {
      if (parentNode.left.val === target) targetNode = parentNode.left;
    }
    if (parentNode.right) {
      if (parentNode.right.val === target) targetNode = parentNode.right;
    }
  }

  // Undefined if the target cannot be found
  if (!targetNode) return undefined;

  // Case 0: Zero children and no parent:
  //   return null
  if (!parentNode && !targetNode.left && !targetNode.right) return null;
  // Case 1: Zero children:
  //   Set the parent that points to it to null
  if (parentNode && !targetNode.left && !targetNode.right) {
    if (parentNode.left.val === target) parentNode.left = null;
    else parentNode.right = null;
    return;
  }
  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  if (targetNode.left && targetNode.right) {
    let predecessorValue = inOrderPredecessor(rootNode, targetNode.val);
    targetNode.val = predecessorValue;
    return;
  }

  // Case 3: One child:
  //   Make the parent point to the child
  if (targetNode.left || targetNode.right) {
    if (parentNode.left === targetNode) {
      if (targetNode.left) parentNode.left = targetNode.left;
      else parentNode.left = targetNode.right;
    }
    else {
      if (targetNode.left) parentNode.right = targetNode.left;
      else parentNode.right = targetNode.right;
    }

    return;
  }
}

function findLeftMost (rootNode) {
  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();

    if (current.left) {
      stack.push(current.left);
    } else {
      return current;
    }
  }
}

function findRightMost (rootNode) {
  let stack = [rootNode];
  while (stack.length > 0) {
    let current = stack.pop();

    if (current.right) {
      stack.push(current.right);
    } else {
      return current;
    }
  }
}

    //      4
    //    /   \
    //   3     6
    //  / \   / \
    // -   - -   7
    let bstRoot = new TreeNode(4);
    bstRoot.left = new TreeNode(2);
    bstRoot.left.left = new TreeNode(1);
    bstRoot.left.right = new TreeNode(3);
    bstRoot.right = new TreeNode(6);
    bstRoot.right.left = new TreeNode(5);
    bstRoot.right.right = new TreeNode(7);

  deleteNodeBST(bstRoot, 1);
  console.log(bstRoot);
  console.log("---------------");
  deleteNodeBST(bstRoot, 2);
  console.log(bstRoot);
  console.log("---------------");
  deleteNodeBST(bstRoot, 5);
  console.log(bstRoot);
  console.log("---------------");
  deleteNodeBST(bstRoot, 6);
  console.log(bstRoot);
  console.log("---------------");

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
