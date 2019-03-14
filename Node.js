function Node(l, c) {
    this.l = l;
    this.c = c;
    this.fils = [];
    this.next;
    this.points = 0;
}

Node.prototype.addNode = function(node) {
    this.fils.push(node);
}

Node.prototype.calculatePoints = function(turn) {

    if (this.fils.length == 0) {

    } else {
        if (turn) // turn == true ==> ai turn
        {
            var max = this.fils[0].points;
            this.next = this.fils[0];
            for (var i = 1; i < this.fils.length; i++) {
                if (max < this.fils[i].points) {
                    max = this.fils[i].points;
                    this.next = this.fils[i];
                }
            }
            this.points = max;
        } else {
            var min = this.fils[0].points;
            this.next = this.fils[0];
            for (var i = 1; i < this.fils.length; i++) {
                if (min > this.fils[i].points) {
                    min = this.fils[i].points;
                    this.next = this.fils[i];
                }
            }
            this.points = min;
        }
    }




}