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
    }

    // Required manipulation methods
    add(value) {
        const node = new LinkedListNode(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    delete(value) {
        if (!this.head) return false;

        // Handle head deletion
        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) this.tail = current;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Existing method kept intact
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

export default LinkedList;