class LinkedListNode {
    //single node in the list
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null; //first node
        this.tail = null; //last node
        this.length = 0; // number of nodes
    }

    add(value) {
        const node = new LinkedListNode(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return this;
    }

    delete(value, compareFn = (a, b) => a === b) {
        if (!this.head) return false;

        if (compareFn(this.head.value, value)) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.length--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (compareFn(current.next.value, value)) {
                current.next = current.next.next;
                if (!current.next) this.tail = current;
                this.length--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    insertAt(index, value) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return this.add(value);
        
        const node = new LinkedListNode(value);
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            node.next = prev.next;
            prev.next = node;
        }
        this.length++;
        return true;
    }

    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }
}

export default LinkedList;