function Element() {
	/*
	 * Null Constructor - Used while loading a previously saved circuit.
	 * Overridden by child class constructors
	 */
	this.Constructor1 = function() {
		elementID = -1;
		elementName = "NullElement";
		elementType = "NullType";
		numInputs = 0;
		numOutputs = 0;
		maxIO = 0;
		width = 0;
		height = 0;
		delay=-1;
		inputList = [];
		outputList = [];
		// location = new Point();
		process_state=true;
	}
	/*
	 * Generic Constructor that creates an element with elementID as "id", elementType as "type",
	 * "numInp" inputs starting with "inpID", "numOut" outputs starting with "outID"
	 * Element is placed at downscaled location "loc"
	 */
	this.Constructor2 = function(id, type, inpID, numInp, outID, numOut, loc) {
		elementID = id;
		process_state=true;
		delay=-1;
		elementType = type;
		elementName = type+Integer.valueOf(id);
		numInputs = numInp;
		numOutputs = numOut;
		maxIO = Math.max(numInputs, numOutputs) + 1;
		width = 2*(20*maxIO);
		height = 2*(20*maxIO);
		location = new Point(loc);
		inputList = [];
		outputList = [];
		for(var i=0; i<numInp; i++)
			inputList.push(new Input(inpID+i, i, this, new Point(loc)));
		for(var i=0; i<numOut; i++)
			outputList.push(new Output(inpID+i, i, this, new Point(loc)));
	}

	/**************************************************************************
	 * Functions that set values/parameters for a particular element instance *
	 **************************************************************************/

	/*
	 * setNumInputs(inpCount) sets the number of inputs to inpCount
	 * This function is used during loadCircuit when the numInputs is specified
	 */
	this.getprocess_state = function() {
		return process_state;
	}

	this.setprocess_state = function(st) {
		process_state = st;
	}

	this.setNumInputs = function(inpCount) {
		numInputs = inpCount;
	}

	/*
	 * setElementID(id) sets the elementID of the element
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setElementID = function(id) {
		elementID = id;
	}

	this.setgatedelay = function(d) {
		delay = d;
	}

	/*
	 * setElementType(typeName) sets the type of the element
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setElementType = function(typeName) {
		elementType = typeName;
	}

	/*
	 * setElementName(name) sets the name of the element scanned from the ckt file
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setElementName = function( name) {
		elementName = name;
	}

	/*
	 * setNumOuptuts(outCount) sets the number of outputs for the element
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setNumOutputs = function(outCount) {
		numOutputs = outCount;
	}

	/*
	 * setInputAt(ind, inp) sets "inp" as the input at index "ind"
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setInputAt = function( ind,  inp) {
		inputList.setElementAt(inp, ind);
	}

	/*
	 * setOutputAt(ind, out) sets "out" as the input at index "ind"
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.setOutputAt = function(ind,  out) {
		outputList.setElementAt(out, ind);
	}

	/*
	 * addInput(inpNode) adds "inpNode" as an input to the list of existing inputs to the element
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.addInput = function(inpNode) {
		numInputs = numInputs + 1;
		inputList.add(inpNode);
	}

	/*
	 * addOutput(outNode) adds "outNode" as an output to the list of exisiting outputs to the element
	 * This function is used during loadCircuit when the null constructor is called
	 */
	this.addOutput = function(outNode) {
		numOutputs = numOutputs + 1;
		outputList.add(outNode);
	}

	/*
	 * setLocation(newPoint) shift the existing location of the element to newPoint
	 * This function is called with every movement(drag) of the element in circuit space
	 */
	this.setLocation = function(newPoint) {
		location = newPoint;
	}

	/*
	 * setInbuiltCkt(newCkt) sets "newCkt" as the inbuiltCkt for a generic element
	 * This function is called when an exisitng circuit file is imported as an element
	 * It is also called when a generic elment is a part of a saved circuit and is loaded back.
	 */
	this.setInbuiltCkt = function(newCkt) {
		inbuiltCkt = new Circuit(newCkt);
		maxIO = Math.max(newCkt.getNumInputs(), newCkt.getNumOutputs()) + 1;
		width = 2*(20*maxIO);
		height = 2*(20*maxIO);
		System.out.println("Inside setInbuiltCkt : maxIO : " + maxIO);
	}


	/***************************************************************************
	 * Functions that gets values/parameters for a particular element instance *
	 ***************************************************************************/

	/*
	 * getElementID() returns an integer value specifying
	 * the ID of the current element (this)
	 */
	this.getElementID = function() {
		return elementID;
	}
	this.getgatedelay = function() {
		return delay;
	}

	/*
	 * getElementType returns a string value specifying 
	 * the type of the current Element (this)
	 */
	this.getElementType = function() {
		return elementType;
	}

	/*
	 * getElementName() returns a string value specifiying
	 * the name of the current Element (this)
	 */
	this.getElementName = function() {
		return elementName;
	}

	/*
	 * getNumInputs() returns the an integer value specifying the
	 * number of inputs for the current Element(this)
	 */
	this.getNumInputs = function() {
		return numInputs;
	}

	/*
	 * getNumOutputs() returns an integer value specifying the
	 * number of outputs for the current Element(this)
	 */
	this.getNumOutputs = function() {
		return numOutputs;
	}

	/*
	 * getMaxIO() retuns an integer value specifying the value of maxIO
	 * (maxIO-1) denotes the max. among the number of inputs and outputs
	 * This is useful to identify the bounding box for drawing a generic element
	 */
	this.getMaxIO = function() {
		return maxIO;
	}

	/*
	 * getLocation() returns the downscaled location of the current element(this)
	 * This also equals the (location.y, location.x) indexes in matrixType, matrixID matrices of the circuit
	 */
	this.getLocation = function() {
		return location;
	}

	/*
	 * getInputList() returns a list of all the inputs for the current element (this)
	 */
	this.getInputList = function() {
		return inputList;
	}

	/*
	 * getInputAt(index) returns the input at index "index" for the current element (this)
	 */
	this.getInputAt = function(index) {
		return inputList[index];
	}

	/*
	 * getOutputList() returns a list of all outputs for the current element (this)
	 */
	this.getOutputList = function() {
		return outputList;
	}

	/*
	 * getOuptutAt(index) returns the output node at index "index" for the current element (this)
	 */
	this.getOutputAt = function(index) {
		return outputList[index];
	}

	/*
	 * getInbuiltCircuit() returns the internal circuit for a generic element
	 */
	this.getInbuiltCircuit = function() {
		return inbuiltCkt;
	}


	/*************************************************************************
	 *        Overridden Functions - Implemented by child classes            *
	 * They have to be implemented compulsorily by each of its child classes *
	 *************************************************************************/

	/*
	 * processInputs() implements the internal logic of the element (this)
	 * It processes the populated inputs and populates the outputs.
	 * These outputs can be passed on to next level.
	 */
	this.processInputs = function() {
		throw "Not supported yet.";
	}

	/*
	 * updateLocation(p) updates the location of the current element to Point p.
	 * The function also updates the locations of all its input and output nodes simulataneously.
	 * This function is called at ever element Drag step.
	 */
	this.updateLocation = function(p) {
		throw "Not supported yet.";
	}

	/*
	 * updateMatrix(p, matrixType, matrixID, prev) updates the matrixID and matrixType matrices
	 * that define the circuit space matrix.
	 * This function is called only at mouseRelease after a drag -
	 * when the current element (this) is moved form Point "prev" to Point "p"
	 * matrixID and matrixType of location "prev" are made 0
	 * matrixID and matrixType of location "p" are updated.
	 * The function also updates the locations of all its input and output nodes simulataneously.
	 */
	this.updateMatrix = function(p,  matrixType,  matrixID, prev) {
		throw "Not supported yet.";
	}

	/*
	 * draw(g, p) draws the element using Java 2D graphics with point p as center location.
	 */
	this.draw = function(g, p) {
		throw "Not supported yet.";
	}
}
