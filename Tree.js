function Tree() {
    this.root = new Node(20, 20);
}

Tree.prototype.addNode = function(node) {
    this.root.addNode(node);
}