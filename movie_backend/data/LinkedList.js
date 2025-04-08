class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
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