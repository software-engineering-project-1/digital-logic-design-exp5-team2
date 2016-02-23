/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author rajesh, buddy
 *
 * An Output is an independent data structure that a processing element passes on values after processing inputs
 * It is defined by an "outputID" and is located at "outputIndex" index to the element "ancestor"
 * An output is placed at a certain "location" wrto its parent element and holds an integral "dataValue"
 * The data value in the output can be probed by setting the probed flag.
 * Outputs can also be time varying values that are denoted by label functions that are user-defined.
 * These time varying values depend on the time varying inputs that its parent element receives
 *
 */
function Output() {
  /*
   * All the variables are private and can be read/written only using get/set functions defined below
   *
   * private int outputID;                        id of the output - varies independent of the element to which it belongs.
   *                                              every output of every element in the circuit has a unique id
   * private int outputIndex;                     index of the output among its several companions for its parent element
   * private Element ancestor;                    parent element to which the output belongs to - to which it feeds its value
   * private int dataValue;                       the integral data value that it holds after processing by the element
   * private Vector<Input> destinationInputs;     A vector of input nodes to which it passes on its data value
   *                                              These inputs belong to elements to which this output is connected in the circuit
   * private Vector<Integer> destInpIds;          A vector of all the ids of input nodes to which this data value is fed
   *                                              It stores the ids of all the output nodes specified in the vector above
   *                                              This is used while loading a saved circuit
   * private Point location;                      downscaled location in circuit space where the output is located. Its wrt its parent
   *                                              The output is drawn in the circuit space using this location value.
   * private boolean probed;                      a boolean flag that is set if the data value of the output is being probed
   * private String timePulseLabel;               the string value of the time label that denotes the function of time varying output
   *
   */
  var outputID, outputIndex, dataValue, stateValue, ancestor, distinationInputs, destInpIds, location, probed, timeVarying, Name;

  /*
   * This constructor is used while loading a circuit
   * It is used without location as the location value is read at a later time
   * It creates an output with outputID(id), outputIndex(index) and sets its ancestor(parent)
   * The other member variables are set later using corresponding set functions
   * The destinationInputs vector is empty as connections are not yet specified.
   * Since it is not probed initially, probed(false)
   */
  this.constructor1 = function(id, index, parent) {
    outputID = id;
    outputIndex = index;
    dataValue = -1;
    statevalue=0;
    ancestor = parent;
    destinationInputs = [];
    destInpIds = [];
    location = new Point();
    probed = false;
    timeVarying = false;
    name="out";
  }

  this.constructor2 = function(id, index, parent, out_name) {
    outputID = id;
    outputIndex = index;
    dataValue = -1;
    statevalue=0;
    ancestor = parent;
    destinationInputs = [];
    destInpIds = [];
    location = new Point();
    probed = false;
    timeVarying = false;
    name=out_name;
  }

  /*
   * This constructor is called when a new element is created using circuit formation
   * It creates an output with outputID(id), outputIndex(index), sets its ancestor(parent)
   * and also sets its location(loc)
   * The data value is default set to -1 as connections and destinationInputs are not yet specified.
   * Initially, since it is not probed, probed(flase)
   */
  this.constructor3 = function(id, index, parent, loc) {
    outputID = id;
    outputIndex = index;
    dataValue = -1;
    statevalue=0;
    ancestor = parent;
    destinationInputs = [];
    destInpIds = [];
    location = new Point(loc);
    probed = false;
    timeVarying = false;
    name="out";
  }

  this.constructor4 = function(id, index, parent, loc, out_name) {
    outputID = id;
    outputIndex = index;
    dataValue = -1;
    statevalue=0;
    ancestor = parent;
    destinationInputs = [];
    destInpIds = [];
    location = new Point(loc);
    probed = false;
    timeVarying = false;
    name=out_name;
  }
  /*************************************************************************
   * Functions that set values/parameters for a particular output instance *
   *************************************************************************/

  /*
   * setDataValue(val) sets the data value that the output holds to val
   */

  this.setDataValue = function(val) {
    dataValue = val;
  }
  this.setstatevalue = function(val) {
    statevalue=val;
  }

  /*
   * setAncestor(parent) sets the parent element of this output to parent
   */
  this.setAncestor = function(parent) {
    ancestor = parent;
  }

  /*
   * addDestInpId(id) function is called while loading a circuit
   * The ckt file stores a list of ids of all the inputs to which this output is connected
   * Hence, storing that list in destInpIds helps later
   * to add actual input nodes to the destinationInputs vector
   */
  this.addDestInpId = function(id) {
    if (!destInpIds.contains(id)) {
      destInpIds.add(id);
      return true;
    }
    return false;
  }

  /*
   * addDestinationInput(destInput) adds destInput to its list of connected inputs
   * to which it feeds forward its value after its ancestor has been processed.
   */
  this.addDestinationInput = function(destInput) {
    destinationInputs.add(destInput);
  }

  /*
   * setLocation(newLoc) sets the location of the output to newLoc from its previous value
   * It is called for every drag of its parente element
   */
  this.setLocation = function(newLoc) {
    location = newLoc;
  }

  /*
   * setOutputIndex(ind) sets the index of the current output for its ancestor element
   * It means that this output is the ind-th output of its parent element
   */
  this.setOutputIndex = function(ind) {
    outputIndex = ind;
  }

  this.setname = function(out_name) {
    name=out_name;
  }

  /*
   * setProbed(state) sets the probing state for this output
   * If set, then a label appears on the circuit space next to this output
   * showing the value that it holds after its parent element has been processed
   */
  this.setProbed = function(state) {
    probed = state;
  }

  /*
   * setTimeVarying(state) sets the timeVarying state to (state)
   * If timeVarying is set, the data value varies with time
   * If timeVarying is false, then the value remains static
   */
  this.setTimeVarying = function(state) {
    timeVarying = state;
  }

  /**************************************************************************
   * Functions that gets values/parameters for a particular output instance *
   **************************************************************************/
  /*
   * returns the vector containing integral values of ids of
   * the input nodes to which its value is fed to at the next level
   * For a circuit level output, this list is empty
   */
  this.getDestInpIdsList = function() {
    return destInpIds;
  }

  /*
   * getOutputID() returns an integral value of the id of the current output
   */
  this.getOutputID = function() {
    return outputID;
  }

  /*
   * getDataValue() returns the dataValue that it holds
   * and gives to its parent element for processing
   */
  this.getDataValue = function() {
    return dataValue;
  }
  this.getstatevalue = function() {
    return statevalue;
  }
  /*
   * getAncestor() returns the element ancestor i.e. the parent element
   * to which it belongs
   */
  this.getAncestor = function() {
    return ancestor;
  }


  this.getname = function() {
    return name;
  }

  /*
   * getDestinationInputList() returns a vector containing a list of input nodes
   * to which this output is connected and passes on its data value
   * This vector is empty in case of outptus at the circuit level
   * i.e. those which are not connected to any inputs
   */
  this.getDestinationInputList = function() {
    return destinationInputs;
  }

  /*
   * getLocation() returns a Point data structure denoting the location in circuit space
   * where the input is located. It is used while drawing the input or saving the circuit
   */
  this.getLocation = function() {
    return location;
  }

  /*
   * getOutputIndex() returns an integral value of the index of the output in its ancestor's
   * list of inputs. It is used for reading the outputIndex value
   */
  this.getOutputIndex = function() {
    return outputIndex;
  }

  /*
   * isProbed() returns true if this output is being probed, else false
   */
  this.isProbed = function() {
    return probed;
  }

  /*
   * isTimeVarying() returns true if the value at this output varies with time
   */
  this.isTimeVarying = function() {
    return timeVarying;
  }

  /*
   * delDestInpNode(delDestInput) removes delDestInput from the list of its destination inputs
   * This function is called when a connection is removed between any input and this output
   */
  this.delDestInpNode = function(delDestInput) {
    if (destInpIds.contains(delDestInput.getInputID())) {
      destInpIds.removeElement(delDestInput.getInputID());
      destinationInputs.remove(delDestInput);
      return true;
    }
    return false;
  }
}
