/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author rajesh, buddy
 *
 * A Generic Element is a freely existing processing element that is a child class of Element Class
 * It can have any number of inputs and outputs and has its own logic of simulation.
 * The logic of the element is defined by the inbuilt circuit present in the element
 * A Generic element is like a black-box representation of its inbuilt Circuit.
 * It is created by importing an existing circuit file as an element.
 * It inherits protected variables from the Element class and
 * implements the functions in ElementInterface
 *
 */

//public class GenericElement extends Element implements ElementInterface {
//GenericElement.prototype = new Element();
function GenericElement() {
  /*
   * Null Constructor creates a null definition of a Generic Element.
   * with width = 20*maxIO pixels, height = 20*maxIO pixels, type = "Generic_Element"
   * This constructor is called while loading a circuit.
   */
  this.constructor1 = function() {
    elementID = 0;
    elementType = "";
    elementName = "Generic_Element";
    numInputs = 0;
    numOutputs = 0;
    maxIO = 0;
    width = 0;
    height = 0;
    delay=-1;
    inputList = [];
    outputList = [];
    location = new Point();
    inbuiltCkt = new Circuit();
    process_state=true;
  }

  /*
   * Constructor with arguments - called when a new GenericElement is added to current circuit
   * Creating a Generic Element with elementID(id), elementType(type) at location(coord)
   * Creates a Generic Element with 2 inputs with ids starting with "inpID", incrementally
   * and outputs with ids starting with "outID" incrementally.
   */
  this.constructor2 = function(id, type, indID, outID, loc, genCkt) {
    elementID = id;
    elementType = type;
    elementName = type + String.valueOf(id);
    numInputs = genCkt.getNumInputs();
    numOutputs = genCkt.getNumOutputs();
    maxIO = Math.max(numInputs, numOutputs) + 1;
    width = 2*(20*maxIO);
    height = 2*(20*maxIO);
    process_state=true;
    delay=-1;
    inputList = [];
    outputList = [];
    location = new Point(loc);
    inbuiltCkt = new Circuit(genCkt);
    inbuiltCkt.identifyCktInputsOutputs();
    var cnt_i=0;
    var cnt_j=0;
    for(cnt_i=0;cnt_i<inbuiltCkt.numInputs;cnt_i++) {
      for(cnt_j=cnt_i+1;cnt_j<numInputs;cnt_j++) {
        Input temp;
        if(inbuiltCkt.circuitInputsList.elementAt(cnt_j).getLocation().y < inbuiltCkt.circuitInputsList.elementAt(cnt_i).getLocation().y ) {
          temp=inbuiltCkt.circuitInputsList.elementAt(cnt_j);
          inbuiltCkt.circuitInputsList.set(cnt_j, inbuiltCkt.circuitInputsList.elementAt(cnt_i));
          inbuiltCkt.circuitInputsList.set(cnt_i, temp);
        }
      }
    }
    var starty  = loc.y - (numInputs-1);
    for(var i=0; i<numInputs; i++) {
      inputList.add(new Input(inpID, i, this, new Point(loc.x - maxIO, starty),inbuiltCkt.circuitInputsList.elementAt(i).getname()));
      inpID = inpID + 1;
      starty = starty + 2;
    }
    for(cnt_i=0;cnt_i<inbuiltCkt.numOutputs;cnt_i++) {
      for(cnt_j=cnt_i+1;cnt_j<numOutputs;cnt_j++) {
        Output temp;
        if(inbuiltCkt.circuitOutputsList.elementAt(cnt_j).getLocation().y < inbuiltCkt.circuitOutputsList.elementAt(cnt_i).getLocation().y ) {
          temp=inbuiltCkt.circuitOutputsList.elementAt(cnt_j);
          inbuiltCkt.circuitOutputsList.set(cnt_j, inbuiltCkt.circuitOutputsList.elementAt(cnt_i));
          inbuiltCkt.circuitOutputsList.set(cnt_i, temp);
        }
      }
    }
    starty = loc.y - ((numOutputs-1));
    for(var i=0; i<numOutputs; i++) {
      outputList.add(new Output(outID, i, this, new Point(loc.x + maxIO, starty),inbuiltCkt.circuitOutputsList.elementAt(i).getname()));
      outID = outID + 1;
      starty = starty + 2;
    }
  }

  /*
   * Overridden function - updates the location of the generic element to Point "p"
   * input and output locations are also updated.
   */
  this.updateLocation = function(p) {
    // Update this.location to (p.x, p.y) for the element
    location.x = p.x;
    location.y = p.y;
    // Update the locations of the input nodes to the element
    var starty = p.y - (numInputs - 1);
    for(var i = 0; i < numInputs; i++) {
      inputList.elementAt(i).setLocation(new Point(p.x - maxIO, starty));
      starty = starty + 2;
    }
    // Update the locations of the output nodes to the element
    starty = p.y - (numOutputs - 1);
    for(var i = 0; i < numOutputs; i++) {
      outputList.elementAt(i).setLocation(new Point(p.x + maxIO, starty));
      starty = starty + 2;
    }
  }

  /*
   * Overridden function updateMatrix updates the circuit matrices
   * shifting the generic element from location "prev" to "p"
   */
  this.updateMatrix = function(p, matrixType, matrixID, prev) {
    /*
     * For a new generic element, prev is null
     * For an existing generic element, it is moved from "prev" to "p"
     * Update the matrix values at prev to 0 => no generic element exists there
     */
    //System.out.println("update:"+prev);
    //System.out.println(maxIO);
    if(prev != null) {
      for (var i = -maxIO; i <= maxIO; i++) { // update element type and ID
        for (var j = -maxIO; j <= maxIO; j++) {
          matrixID[prev.y + j][prev.x + i] = 0;
          matrixType[prev.y + j][prev.x + i] = 0;
        }
      }
      for(var i = 0; i < numInputs; i++) {
        //Point currInp = inputList.elementAt(i).getLocation();
        matrixID[currInp.y][currInp.x] = 0;
        matrixType[currInp.y][currInp.x] = 0;
      }
      for(var i = 0; i < numOutputs; i++) {
        //Point currOut = outputList.elementAt(i).getLocation();
        matrixID[currOut.y][currOut.x] = 0;
        matrixType[currOut.y][currOut.x] = 0;
      }
    }
    /*
     * Update the matrix values at location "p" to elementID and elementType
     */
    for (var i = -maxIO; i <= maxIO; i++) { // update element type and ID
      for (var j = -maxIO; j <= maxIO; j++) {
        matrixType[p.y + j][p.x + i] = 3;
        matrixID[p.y + j][p.x + i] = elementID;
      }
    }
    for (var i = 0; i < numInputs; i++) {
      //Point currInp = this.getInputAt(i).getLocation();
      matrixID[currInp.y][currInp.x] = this.getInputAt(i).getInputID();
      matrixType[currInp.y][currInp.x] = 1;
    }
    for (var i = 0; i < numOutputs; i++) {
      //Point currOut = this.getOutputAt(i).getLocation();
      matrixID[currOut.y][currOut.x] = this.getOutputAt(i).getOutputID();
      matrixType[currOut.y][currOut.x] = 2;
    }
  }

  /*
   * Overridden function processInputs()
   * processInputs() does the processing on all its inputs and fills the output nodes
   * It is done step wise
   * - passing on the element inputs to the inbuilt circuit
   * - processing the inbuilt circuit
   * - passing on the inbuitl circuit output results to the element outputs
   */
  this.processInputs = function() {
    process_state=true;
    // System.out.println("Processing Generic Element");
    // Step 1: Identify The Inputs and Outputs for the inbuilt circuit of the generic element
    inbuiltCkt.identifyCktInputsOutputs();
    var cnt_i=0;
    var cnt_j=0;
    for(cnt_i=0;cnt_i<inbuiltCkt.numInputs;cnt_i++) {
      for(cnt_j=cnt_i+1;cnt_j<numInputs;cnt_j++) {
        //Input temp;
        if(inbuiltCkt.circuitInputsList.elementAt(cnt_j).getLocation().y < inbuiltCkt.circuitInputsList.elementAt(cnt_i).getLocation().y ) {
          temp=inbuiltCkt.circuitInputsList.elementAt(cnt_j);
          inbuiltCkt.circuitInputsList.set(cnt_j, inbuiltCkt.circuitInputsList.elementAt(cnt_i));
          inbuiltCkt.circuitInputsList.set(cnt_i, temp);
        }
      }
    }
    // Step 2: Feed the element Inputs to Circuit Inputs
    for(var i = 0; i < inputList.size(); i++) {
      inbuiltCkt.getCircuitInputAt(i).setDataValue(inputList.elementAt(i).getDataValue());
      inbuiltCkt.getCircuitInputAt(i).setNewValue(inputList.elementAt(i).getDataValue());
    }
    // Step 3: Process the inbuilt Ckt
    var retStatus = inbuiltCkt.processCircuit(Boolean.TRUE);
    if(!retStatus) {
      process_state=false;
    }
    // Step 4: Pass on the inbuiltCkt outputs to element Outputs
    for(cnt_i = 0;cnt_i < inbuiltCkt.numOutputs; cnt_i++) {
      for(cnt_j = cnt_i + 1; cnt_j < numOutputs; cnt_j++) {
        //Output temp;
        if(inbuiltCkt.circuitOutputsList.elementAt(cnt_j).getLocation().y < inbuiltCkt.circuitOutputsList.elementAt(cnt_i).getLocation().y) {
          temp = inbuiltCkt.circuitOutputsList.elementAt(cnt_j);
          inbuiltCkt.circuitOutputsList.set(cnt_j, inbuiltCkt.circuitOutputsList.elementAt(cnt_i));
          inbuiltCkt.circuitOutputsList.set(cnt_i, temp);
        }
      }
    }
    for(var i = 0; i < outputList.size(); i++) {
      outputList.elementAt(i).setDataValue(inbuiltCkt.getCircuitOutputAt(i).getDataValue());
    }
  }
}
