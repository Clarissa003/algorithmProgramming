class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor(compareFn) {
        this.root = null;
        this.compare = compareFn;
    }

    insert(value) {
        const newNode = new BinaryTreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        
        let current = this.root;
        while (true) {
            const comparison = this.compare(value, current.value);
            if (comparison < 0) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    findMin() {
        if (this.root === null) return null;
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    findMax() {
        if (this.root === null) return null;
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

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