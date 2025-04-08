class LinkedListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    add(value) {
      const node = new LinkedListNode(value);
      if (!this.head) {
        this.head = node;
      } else {
        let current = this.head;
        while (current.next) current = current.next;
        current.next = node;
      }
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
  }
  
  module.exports = LinkedList;
  