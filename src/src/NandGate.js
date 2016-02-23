
//NandGate.prototype = new Element();

function NandGate() {
  /* switch (arguments.length) {
     case 0 :
     constructor1();
     break;
     case 5 :
     constructor2();
     break;
     } */

  this.constructor1 = function() {
    elementID = 0;
    elementType = "Nand_Gate";
    elementName = "";
    numInputs = 0;
    numOutputs = 0;
    maxIO = 3;
    width = 120;
    height = 80;
    inputList = [];
    outputList = [];
    location = new Point();
  }

  this.constructor2 = function(id, type, inpId, outId, coord) {
    elementID = id;
    elementType = type;
    elementName = type + String.valueOf(id);
    numInputs = 2;
    numOutputs = 1;
    maxIO = 3;
    width = 120;
    height = 80;
    inputList = [];
    outputList = [];
    inputList.add(new Input(inpId, 0, this, new Point(coord.x-3, coord.y-1)));
    inputList.add(new Input(inpId+1, 1, this, new Point(coord.x-3, coord.y+1)));
    outputList.add(new Output(outId, 0, this, new Point(coord.x+3, coord.y)));
    location = new Point(coord);
  }


  this.updateLocation() = function(p) {
    // Update this.location to (p.x, p.y) for the element
    location.x = p.x;
    location.y = p.y;
    // Update the locations of 2 input nodes to the element
    inputList.elementAt(0).setLocation(new Point(p.x-3, p.y-1));
    inputList.elementAt(1).setLocation(new Point(p.x-3, p.y+1));
    // Update the locations of the single output node to the element
    outputList.elementAt(0).setLocation(new Point(p.x+3, p.y));
  }

  this.updateMatrix() = function(p, matrixType, matrixID, prev) {
    if(prev != null) {
      for (var i = -3; i < 4; i++) {                               // update element type and ID
        for (var j = -2; j < 3; j++) {
          matrixType[prev.y - j][prev.x - i] = 0;
          matrixID[prev.y - j][prev.x - i] = 0;
        }
      }
      matrixType[p.y][p.x + 3] = 0;                                // update output type and ID
      matrixID[p.y][p.x + 3] = 0;
      matrixType[p.y - 1][p.x - 3] = 0;                            // update input type and ID
      matrixType[p.y + 1][p.x - 3] = 0;
      matrixID[p.y - 1][p.x - 3] = 0;
      matrixID[p.y + 1][p.x - 3] = 0;
    }
    for(var i=-3; i<4; i++) {                               // update element type and ID
      for(var j=-2; j<3; j++) {
        matrixType[p.y-j][p.x-i] = 3;
        matrixID[p.y-j][p.x-i] = this.elementID;
      }
    }
    matrixType[p.y][p.x+3] = 2;                                 // update output type and ID
    matrixID[p.y][p.x+3] = this.getOutputAt(0).getOutputID();
    matrixType[p.y-1][p.x-3] = 1;                               // update input type and ID
    matrixType[p.y+1][p.x-3] = 1;
    matrixID[p.y-1][p.x-3] = this.getInputAt(0).getInputID();
    matrixID[p.y+1][p.x-3] = this.getInputAt(1).getInputID();
  }

  this.processInputs = function() {
    var value = inputList.elementAt(0).getDataValue();
    for(var i=1; i<inputList.size(); i++) {
      value = value & inputList.elementAt(i).getDataValue();
    }
    if(value == 0)
      outputList.elementAt(0).setDataValue(1);
    else
      outputList.elementAt(0).setDataValue(0);
  }
}

