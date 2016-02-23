function Input() {
  /*
   * All the variables are private and can be read/written only using get/set functions defined below
   *
   * private int inputID;                 id of the input - varies independent of the element to which it belongs.
   *                                      every input of every element in the circuit has a unique id
   * private int inputIndex;              index of the input among its several companions for its parent element
   * private Element ancestor;            parent element to which the input belongs to - to which it feeds its value
   * private int dataValue;               the integral data value that it holds for processing by the element
   * private Output sourceOutput;         the output node(if_not_null) from which it got its data value
   *                                      sourceOutput = null if the input is a circuit level input - has no predecessor outputs
   * private Point location;              downscaled location in circuit space where the input is located. Its wrt its parent
   *                                      The input is drawn in the circuit space using this location value.
   * private boolean probed;              a boolean flag that is set if the data value of the input is being probed
   * private boolean Input;         a boolean flag to detect if this input node is getting time-varying values or not
   * private String timePulseLabel;       the string value of the time label that denotes the function of time varying input
   *
   */
  var inputID,inputIndex, ancestor, dataValue, newValue, sourceOutput, location, probed, timeVarying, timePulseLabel, Name;

  /*
   * This constructor is used while loading a circuit
   * It is used without location as the location value is read at a later time
   * It creates an input with inputID(id), inputIndex(index) and sets its ancestor(parent)
   * The other member variables are set later using corresponding set functions
   * The sourceOutput is null as connections are not yet specified.
   * Since it is not probed initially, probed(false)
   */
  this.constructor1 = function(id, index, parent) {
    inputID = id;
    inputIndex = index;
    dataValue = -1;
    newValue=-1;
    ancestor = parent;
    sourceOutput = null;
    location = new Point();
    probed = false;
    timeVarying = false;
    Name="in";
  }

  this.constructor2 = function(id, index, parent,in_name) {
    inputID = id;
    inputIndex = index;
    dataValue = -1;
    newValue=-1;
    ancestor = parent;
    sourceOutput = null;
    location = new Point();
    probed = false;
    timeVarying = false;
    Name=in_name;
  }

  /*
   * This this.constructor is called when a new element is created using circuit formation
   * It creates an input with inputID(id), inputIndex(index), sets its ancestor(parent)
   * and also sets its location(loc)
   * The data value is default set to -1 as connections and sourceOutput are not yet specified.
   * Initially, since it is not probed, probed(flase)
   */
  this.constructor3 = function(id, index, parent, loc) {
    inputID = id;
    inputIndex = index;
    dataValue = -1;
    newValue=-1;
    ancestor = parent;
    sourceOutput = null;
    location = new Point(loc);
    probed = false;
    timeVarying = false;
    Name="in";
  }

  this.constructor4 = function(id, index, parent, loc,in_name) {
    inputID = id;
    inputIndex = index;
    dataValue = -1;
    newValue=-1;
    ancestor = parent;
    sourceOutput = null;
    location = new Point(loc);
    probed = false;
    timeVarying = false;
    Name=in_name;
  }

  this.setAncestor() = function(parent) {
    ancestor = parent;
  }

  this.setDataValue() = function(val) {
    dataValue = val;
  }

  /*
   * setDataValue(val) sets the data value that the input holds to val
   */

  this.setNewValue() = function(val) {
    newValue = val;
  }

  /*
   * setSourceOuptut(newOutput) sets the sourceOutput to newOutput
   * It means that the value in newOutput is passed on to this input
   */

  this.setSourceOutput() = function(newOutput) {
    sourceOutput = newOutput;
  }


  /*
   * setLocation sets the location of this input to newLoc from its previous value
   * This function is called for every drag of its parent element
   */

  this.setLocation() = function(newLoc) {
    location = newLoc;
  }

	this.setInputIndex() = function(ind) {
    inputIndex = ind;
  }

  /*
   * setInputIndex(ind) sets the inputIndex(ind)
   * It means that this input is the ind-th input to its parent element ancestor
   */
  this.setname() = function(in_name) {
    Name=in_name;
  }

  /*
   * setProbed(state) sets the probed state to (state)
   * If probed is set, the data value at the input is being probed, and a label appears showing the value
   * If probed is false, then the value remains incognito - There is no label on the circuit
   */

  this.setProbed() = function(state) {
    probed = state;
  }



  /*
   * setTimeVarying(state) sets the timeVarying state to (state)
   * If timeVarying is set, the data value varies with time
   * If timeVarying is false, then the value remains static
   */

  this.setTimeVarying() = function(state) {
    timeVarying = state;
  }

  /*
   * setTimePulseLabel(label) sets the timePulseLabel(label)
   * label denotes a time varying input function that is fed to the input
   * The data value in the input varies with it.
   */

  this.setTimePulseLabel() = function(label) {
    if (label != null) {
      timeVarying = true;
    } else {
      timeVarying = false;
    }
    timePulseLabel = label;
  }


  /*************************************************************************
   * Functions that gets values/parameters for a particular input instance *
   *************************************************************************/
  /*
   * getInputID() returns an integral value of the id of the current input
   */
  this.getInputID() = function() {
    return inputID;
  }

  /*
   * getAncestor() returns the element ancestor i.e. the parent element
   * to which it belongs
   */
  this.getAncestor() = function() {
    return ancestor;
  }

  /*
   * getDataValue() returns the dataValue that it holds
   * and gives to its parent element for processing
   */
  this.getDataValue() = function() {
    return dataValue;
  }


  this.getNewValue() = function() {
    return newValue;
  }

  /*
   * getSourceOutputNode() returns the output node data structure from which
   * this input gets its data value
   * If it returns null, then it has no predecessor and its also a circuit level input
   */
  this.getSourceOutputNode() = function() {
    return sourceOutput;
  }

  /*
   * getLocation() returns a Point data structure denoting the location in circuit space
   * where the input is located. It is used while drawing the input or saving the circuit
   */
  this.getLocation() = function() {
    return location;
  }

  /*
   * getInputIndex() returns an integral value of the index of the input in its ancestor's
   * list of inputs. It is used for reading the inputIndex value
   */
  this.getInputIndex() = function() {
    return inputIndex;
  }

  this.getname() = function() {
    return Name;
  }

  // isProbed() returns true if this input is being probed, else false
  this.isProbed() = function() {
    return probed;
  }

  // isTimeVarying() returns true if the value at this input varies with time
  this.isTimeVarying() = function() {
    return timeVarying;
  }

  /*
   * getTimePulseLabel() returns a string label that denotes the time varying function that
   * the input uses to change its value while feeding the value to its ancestor element
   */
  this.getTimePulseLabel() = function() {
    return timePulseLabel;
  }

  // "draw" function has to be copied here.
}
