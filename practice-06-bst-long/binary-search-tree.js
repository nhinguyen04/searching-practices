// Do not change this
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  insert(val, currentNode = this.root) {

    const newNode = new TreeNode(val);

    // empty tree, new node as root
    if (!currentNode) {
      currentNode = newNode;
      this.root = currentNode;
      return;
    }

    while(true) {
      // if current val > val, go left
      if (currentNode.val > val) {
        if (!currentNode.left) {
          // left empty, add to left
          currentNode.left = newNode;
          return;
        } else {
          // left not empty, moves on
          currentNode = currentNode.left;
        }
      }

      // if current val < val, go right
      if (currentNode.val < val) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }

  }


  search(val) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val === val) return true;
      else if (currentNode.val > val) currentNode = currentNode.left;
      else if (currentNode.val < val) currentNode = currentNode.right;
    }

    return false;
  }


  preOrderTraversal(currentNode = this.root) {
    // base
    if (!currentNode) {
      return;
    }

    console.log(currentNode.val);

    // recursively visit left
    this.preOrderTraversal(currentNode.left);
    // right
    this.preOrderTraversal(currentNode.right);
  }


  inOrderTraversal(currentNode = this.root) {
    // base
    if (!currentNode) {
      return;
    }

    this.inOrderTraversal(currentNode.left);
    console.log(currentNode.val);
    this.inOrderTraversal(currentNode.right);
  }


  postOrderTraversal(currentNode = this.root) {
    // base
    if (!currentNode) {
      return;
    }

    this.postOrderTraversal(currentNode.left);
    this.postOrderTraversal(currentNode.right);
    console.log(currentNode.val);
  }

    // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current.val);

      // push left and right if not empty
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  // Depth First Traversal - Iterative
  depthFirstTraversal() {
    let stack = [this.root];

    while (stack.length > 0) {
      let current = stack.pop();
      console.log(current.val);

      // push left and right if not empty
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
  }
}




module.exports = { BinarySearchTree, TreeNode };
