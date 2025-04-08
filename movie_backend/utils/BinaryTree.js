//Represents a node in the binary tree
class BinaryTreeNode {
    constructor(value) {
        this.value = value; //movie
        this.left = null; //value < parent
        this.right = null; //value > parent
    }
}

class BinaryTree {
    constructor(compareFn) {
        this.root = null;
        this.compare = compareFn;
    }

    //insert movie into the binary tree
    insert(value) {
        const newNode = new BinaryTreeNode(value);
        if (this.root === null) {
            this.root = newNode; //if its the first insertion, set as root
            return this;
        }
        
        let current = this.root;
        while (true) {
            const comparison = this.compare(value, current.value);
            if (comparison < 0) {
                //insert left if the value < current node
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                //insert right if value >= current node
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // find the lowest value in the binary tree
    findMin() {
        if (this.root === null) return null;
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    //finds the highest value in the binary tree
    findMax() {
        if (this.root === null) return null;
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    //convert to a sorted array (in-order)
    toArray() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    _inOrderTraversal(node, result) {
        if (node !== null) {
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }
}

export default BinaryTree;