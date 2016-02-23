//NotGate.prototype = new Element();
function NotGate() {

  /*
   * Null Constructor creates a null definition of an NotGate.
   * with width = 120 pixels, height = 40 pixels, type = "Not_Gate"
   * This constructor is called while loading a circuit.
   */
  this.constructor1 = function() {
    elementID = 0;
    elementType = "Not_Gate";
    elementName = "";
    numInputs = 0;
    numOutputs = 0;
    maxIO = 3;
    width = 120;
    height = 40;
    inputList = [];
    outputList = [];
    location = new Point();
  }

  /*
   * Constructor with arguments - called when a new NotGate is added to current circuit
   * Creating an NotGate with elementID(id), elementType(type) at location(coord)
   * Creates an NotGate with 2 inputs with ids starting with "inpID", incrementally
   * and outputs with ids starting with "outID" incrementally.
   */
  this.constructor2 = function(id, type, inpId, outId, coord) {
    elementID = id;
    elementType = type;
    elementName = type + String.valueOf(id);
    numInputs = 1;
    numOutputs = 1;
    maxIO = 3;
    width = 120;
    height = 40;
    inputList = [];
    outputList = [];
    inputList.add(new Input(inpId, 0, this, new Point(coord.x-3, coord.y)));
    outputList.add(new Output(outId, 0, this, new Point(coord.x+3, coord.y)));
    location = new Point(coord);
  }

  /*
   * Overridden function - updates the location of the NotGate to Point "p"
   * input and output locations are also updated.
   */

  this.updateLocation = function(p) {
    // Update this.location to (p.x, p.y) for the element
    location.x = p.x;
    location.y = p.y;
    // Update the locations of 2 input nodes to the element
    inputList.elementAt(0).setLocation(new Point(p.x-3, p.y));
    // Update the locations of the single output node to the element
    outputList.elementAt(0).setLocation(new Point(p.x+3, p.y));
  }

  /*
   * Overridden function updateMatrix updates the circuit matrices
   * shifting the Not Gate from location "prev" to "p"
   */
  this.updateMatrix = function(p, matrixType, matrixID, prev) {
    /*
     * For a new Not Gate, prev is null
     * For an existing Not Gate, it is moved from "prev" to "p"
     * Update the matrix values at prev to 0 => no Not Gate exists there
     */
    if(prev != null) {
      for (i = -3; i < 4; i++) {                               // update element type and ID
        for (j = -1; j < 2; j++) {
          matrixType[prev.y - j][prev.x - i] = 0;
          matrixID[prev.y - j][prev.x - i] = 0;
        }
      }
      matrixType[prev.y][prev.x + 3] = 0;  // update output type and ID
      matrixID[prev.y][prev.x + 3] = 0;
      matrixType[prev.y][prev.x - 3] = 0;         // update input type and ID
      matrixID[prev.y][prev.x - 3] = 0;
    }
    /*
     * Update the matrix values at location "p" to elementID and elementType
     */
    for(i=-3; i<4; i++) {                               // update element type and ID
      for(j=-1; j<2; j++) {
        matrixType[p.y-j][p.x-i] = 3;
        matrixID[p.y-j][p.x-i] = this.elementID;
      }
    }
    matrixType[p.y][p.x+3] = 2;                                 // update output type and ID
    matrixID[p.y][p.x+3] = this.getOutputAt(0).getOutputID();
    matrixType[p.y][p.x-3] = 1;                               // update input type and ID
    matrixID[p.y][p.x-3] = this.getInputAt(0).getInputID();
  }

  /*
   * Overridden function processInputs()
   * processInputs() does a Not operation on all its inputs and fills the output nodes
   */
  this.processInputs = function() {
    if(inputList.elementAt(0).getDataValue() == 0)
      outputList.elementAt(0).setDataValue(1);
    else
      outputList.elementAt(0).setDataValue(0);
  }
  /*
   * Overridden function draw
   * Draws an And Gate at point "p"
   */
}
