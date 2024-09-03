class DoublyLinkedList {
  constructor(node = null) {
    this.head = node;
    let idx = -1;
    this.tail = this.iterate((curNode, index) => {
      if (curNode.next === null) {
        idx = index;
        return true;
      }
    });
    this.size = idx + 1;
  }

  iterate(callback) {
    let index = 0;
    let node = this.head;

    while (node !== null) {
      if (callback(node, index) === true) {
        return node;
      }

      node = node.next;
      index++;
    }

    return this.head;
  }

  print() {
    this.iterate((curNode, index) => console.log(curNode.value));
  }

  find(target) {
    let targetNode = this.iterate(((curNode, index) => {
      if (curNode.value === target)
        return true;
    }));

    if (this.head !== null && targetNode === this.head && targetNode.value !== target)
      return null;
    return targetNode;
  }

  addFirst(node) {
    node.prev = null;
    node.next = this.head;
    if (this.head === null) {
      this.tail = node;
    } else {
      this.head.prev = node;
    }
    this.head = node;
    this.size++;
  }

  addLast(node) {
    node.prev = this.tail;
    node.next = null;
    if (this.tail === null)
      this.head = node;
    else
      this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  removeFirst() {
    if (this.head === null)
      return null;

    const oldHead = this.head;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    } else {
      this.head.prev = null;
      oldHead.next = null;
    }
    this.size--;

    return oldHead;
  }

  removeLast() {
    if (this.tail === null)
      return null;

    const oldTail = this.tail;
    if (this.tail.prev === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      oldTail.prev = null;
    }
    this.size--;

    return oldTail;
  }

  replace(idx, node) {
    const nodeFound = this.iterate((curNode, index) => {
      if (index === idx)
        return true;
    });
    
    // idx is out of range
    if (nodeFound === null || (nodeFound === this.head && idx !== 0)) 
      return null;

    node.prev = nodeFound.prev;
    node.next = nodeFound.next;
    
    if (this.head === nodeFound)
      this.head = node;
    else 
      nodeFound.prev.next = node;
    if (this.tail === nodeFound)
      this.tail = node;
    else
      nodeFound.next.prev = node;

    nodeFound.prev = null;
    nodeFound.next = null;

    return node;
  }

  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node);
      return;
    }

    let nodeFound = null;
    this.iterate((curNode, index) => {
      if (index === idx - 1) {
        nodeFound = curNode;
        return true;
      }
    });

    // idx is out of range
    if (nodeFound === null)
      return;

    node.prev = nodeFound;
    node.next = nodeFound.next;
    if (nodeFound === this.tail) 
      this.tail = node;
    else
      nodeFound.next.prev = node;   //fails if nodeFound is tail
    nodeFound.next = node;
    this.size++;
  }


  // insert(idx, node) {
  //   const nodeFound = this.iterate((curNode, index) => {
  //     if (index === idx - 1) {
  //       return true;
  //     }
  //   });

  //   // idx is out of range
  //   if (this.head === null || (nodeFound === this.head && idx !== 0 && idx !== this.size))
  //     return;

  //   if (idx === this.size) {
  //     node.next = null;
  //     node.prev = this.tail;
  //     this.tail = node;
  //   } else {
  //     node.prev = nodeFound.prev;
  //     node.next = nodeFound;
  //     nodeFound.prev = node;
  //     if (nodeFound === this.head)
  //       this.head = node;
  //   }
  //   this.size++;
  // }

  remove(idx) {
    const nodeFound = this.iterate((curNode, index) => {
      if (index === idx)
        return true;
    });

    // idx is out of range
    if (this.head === null || (nodeFound === this.head && idx !== 0))
      return;

    if (nodeFound === this.head && nodeFound === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (nodeFound === this.head) {
      this.head = nodeFound.next;
      nodeFound.next.prev = nodeFound.prev;
    } else if (nodeFound === this.tail) {
      this.tail = nodeFound.prev;
      nodeFound.prev.next = nodeFound.next;
    } else {
      nodeFound.prev.next = nodeFound.next;
      nodeFound.next.prev = nodeFound.prev;
    }
    nodeFound.prev = null;
    nodeFound.next = null;

    this.size--;

    return nodeFound;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

class Node {
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

if (require.main === module) {
  let emptyList = new DoublyLinkedList();

  console.log("");
  console.log("Test - addFirst");
  emptyList.addFirst(new Node('one'));
  console.log("add first node: ", emptyList);
  emptyList.addFirst(new Node('two'));
  console.log("add second node: ", emptyList);

  console.log("");
  console.log("Test - addLast");
  emptyList = new DoublyLinkedList();
  emptyList.addLast(new Node('one'));
  console.log("add first node: ", emptyList);
  emptyList.addLast(new Node('two'));
  console.log("add second node: ", emptyList);

  console.log("");
  console.log("Test - removeLast");
  console.log("initial list: ", emptyList);
  emptyList.removeLast();
  console.log("remove last node 1: ", emptyList);
  emptyList.removeLast();
  console.log("remove last node 2: ", emptyList);

  console.log("");
  console.log("Test - removeFirst");
  emptyList.addFirst(new Node('one'));
  emptyList.addLast(new Node('two'));
  console.log("initial list: ", emptyList);
  emptyList.removeFirst();
  console.log("remove first node 1: ", emptyList);
  emptyList.removeFirst();
  console.log("remove first node 2: ", emptyList);

  // replace(idx, node)
  console.log("");
  console.log("Test - replace");
  emptyList.addFirst(new Node('one'));
  emptyList.addLast(new Node('two'));
  console.log("initial list: ", emptyList);
  emptyList.replace(1, new Node('replace last'));
  console.log("replace the last node: ", emptyList);
  emptyList.replace(0, new Node('replace first'));
  console.log("replace the first node: ", emptyList);

  // clear()
  console.log("");
  console.log("Test - clear");
  console.log("initial list: ", emptyList);
  emptyList.clear();
  console.log("clear: ", emptyList);

  // insert(idx, node)
  console.log("");
  console.log("Test - insert");
  console.log("initial list: ", emptyList);
  emptyList.insert(0, new Node('one'));
  console.log("insert one: ", emptyList);
  emptyList.insert(0, new Node('zero'));
  console.log("insert zero: ", emptyList);
  emptyList.insert(1, new Node('two'));
  console.log("insert two: ", emptyList);
  emptyList.insert(3, new Node('three'));
  console.log("insert three: ", emptyList);

  // remove(idx)
  console.log("");
  console.log("Test - remove");
  console.log("initial list: ", emptyList);
  emptyList.remove(3);
  console.log("remove three: ", emptyList);
  emptyList.remove(1);
  console.log("remove two: ", emptyList);
  emptyList.remove(1);
  console.log("remove one: ", emptyList);
  emptyList.remove(0);
  console.log("remove zero: ", emptyList);
}

module.exports = {
  Node, DoublyLinkedList
}