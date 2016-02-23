function Circuit(){

	var circuitID;
	var circuitName;
	//public int numInputs; -- this.numInputs
	//public int numOutputs; -- this.numOutputs
	//public Vector<Input> circuitInputsList; this.circuit.InputsList = [];
	// public Vector<Output> circuitOutputsList; this.cure = [];
	var inputElementSet = {};
	var outputElementSet = {};
	// private HashSet<Element> inputElementSet; this.inputElementSet = {}; Object a; HashSet b; b[a] = true;
	// private HashSet<Element> outputElementSet; ""
	// public int[][] meshType; a = [[]];
	// public int[][] meshID;  [[]]
	// public HashMap<Integer, Element> allElementsList; a = {}; a[2] = b; where b - Element Function;
	// public HashMap<Integer, Input> allInputsList; ""
	// public HashMap<Integer, Output> allOutputsList; ""


	function Constructor1() {
		circuitID = 0;
		circuitName = "New Circuit";
		this.numInputs = 0;
		this.numOutputs = 0;
		this.circuitInputsList = [];
		this.circuitOutputsList = [];
		inputElementSet = {};
		outputElementSet = {};
		this.allElementsList = {};
		this.allInputsList = {};
		this.allOutputsList = {};
		this.meshType = [];
		this.meshID = [];
	}


	function Constructor2(id, name) {
		circuitID = id;
		circuitName = name;
		this.numInputs = 0;
		this.numOutputs = 0;
		this.circuitInputsList = [];
		this.circuitOutputsList = [];
		inputElementSet = {};
		outputElementSet = {};
		this.allElementsList = {};
		this.allInputsList = {};
		this.allOutputsList = {};
		this.meshType = [];
		this.meshID = [];
	}


	function Constructor3(orgCkt) {
		circuitID = orgCkt.getCircuitID();
		circuitName = orgCkt.getCircuitName();
		this.numInputs = 0;
		this.numOutputs = 0;
		this.circuitInputsList = [];
		this.circuitOutputsList = [];
		inputElementSet = {};
		outputElementSet = {};
		this.allElementsList = {};
		this.allInputsList = {};
		this.allOutputsList = {};
		this.meshType = [];
		this.meshID = [];
	}


	/*
	 *      * setCircuitName(name) sets the circuitName(name)
	 *           */

	this.setCiruitName = function(name) {
		circuitName = name;
	};

	/*
	 *      * setNumInputs(number) sets the numInputs(number)
	 *           * It is called while loading a circuit from a saved file
	 *                */

	this.setNumInputs = function(number) {
		this.numInputs = number;
	};

	/*
	 *      * setNumOutputs(number) sets numOutputs(number)
	 *           * It is called while loading a circuit from a saved file
	 *                */
	this.setNumOutputs = function(number) {
		this.numOutputs = number;
	};

	/*
	 *      * addElement(newElement) adds newElement to the list of all the constituent elements
	 *           * Along with this, the inputs and outputs of newElement are added to corresponding lists
	 *                */
	this.addElement = function(newElement) {
		this.allElementsList[newElement.getElementID()] = newElement;
		for (var i = 0; i < newElement.getNumInputs(); i++) {
			this.allInputsList[newElement.getInputAt(i).getInputID()] = newElement.getInputAt(i);
		}
		for (var i = 0; i < newElement.getNumOutputs(); i++) {
			this.allOutputsList[newElement.getOutputAt(i).getOutputID()] = newElement.getOutputAt(i);
		}
	};

	/*
	 *      * setMeshValues(xIndex, yIndex, nodeType, nodeId) sets the meshType and meshID matrices
	 *           * at (yIndex, xIndex) to nodeType and nodeID values
	 *                */
	this.setMeshValues = function(xIndex, yIndex, nodeType, nodeId) {
		this.meshType[yIndex][xIndex] = nodeType;
		this.meshID[yIndex][xIndex] = nodeId;
	};

	/***************************************************************************
	 *      * Functions that gets values/parameters for a particular circuit instance *
	 *           ***************************************************************************/

	/*
	 *      * getCircuitID() returns an integral value of this circuit
	 *           */
	this.getCircuitID = function() {
		return circuitID;
	};

	/*
	 *      * getCircuitName() returns a string value of the name of the circuit
	 *           */
	this.getCircuitName = function() {
		return circuitName;
	};

	/*
	 *      * getNumInputs() returns an integral value of circuit level inputs
	 *           * i.e. inputs for the entire circuit - if treated as a black box
	 *                */
	this.getNumInputs = function() {
		return this.numInputs;
	};

	/*
	 *      * getNumOutputs() returns an integral value of circuit level outputs
	 *           * i.e. outputs for the entire circuit - if treated as a black box
	 *                */
	this.getNumOutputs = function(){
		return this.numOutputs;
	};

	/*
	 *      * getCircuitInputsList() returns a vector of all the circuit level inputs
	 *           * i.e. input nodes to which circuit input values are fed
	 *                */
	this.CircuitInputsList = function() {
		return this.circuitInputsList;
	};

	/*
	 *      * getCircuitOutputsList() returns a vector of all the circuit level outputs
	 *           * i.e. output nodes of the circuit from where output values are received
	 *                */
	this.getCircuitOutputsList = function(){
		return this.circuitOutputsList;
	};

	/*
	 *      * getCircuitInputAt(ind) returns the ind-th input node of the circuit
	 *           * returns the ind-th circuit level input
	 *                */
	this.getCircuitInputAt = function(ind) {
		return this.circuitInputsList[ind];
	};

	/*
	 *      * getCircuitOutputAt(ind) returns the ind-th output node of the circuit
	 *           * returns the ind-th circuit level output
	 *                */

	this.getCircuitOutputAt = function(ind) {
		return this.circuitOutputsList[ind];
	};

	/*
	 *      * getCircuitInputElementSet() returns a set of elements that have
	 *           * atleast one circuit level input
	 *                */
	this.getInputElementsSet = function() {
		return inputElementSet;
	};

	/*
	 *      * getCircuitOutputElementSet() returns a set of elements that have
	 *           * atleast one circuit level output
	 *                */
	this.getOutputElementsSet = function(){
		return outputElementSet;
	};

	/*
	 *      * getAllElementsList() returns a list of all the constituent elements of the circuit
	 *           */
	this.getAllElementsList = function() {
		return this.allElementsList;
	};

	/*
	 *      * identifyCktInputsOutputs() function identifies circuit level inputs and outputs
	 *           * among all the inputs and outputs of all the constituent elements
	 *                */

	this.identifyCktInputsOutputs = function() {
		/*
		 *          * Clear all the lists that existed till now and reinitialize variables
		 *                   */
		this.circuitInputsList = [];
		this.circuitOutputsList = [];
		inputElementSet = {};
		outputElementSet = {};
		this.numInputs = 0;
		this.numOutputs = 0;

		/*
		 *          * Iterating through all the inputs, if an input has no source output node (null)
		 *                   * i.e. it gets its data value directly from the user and not connected to any previous output,
		 *                            * add this input node as a circuit level input node
		 *                                     */

		for(var it in this.allInputsList) {
			inp = this.allInputsList[parseInt(it)];
			if (inp.getSourceOutputNode() === null) {             // Circuit Input Node
				this.numInputs = this.numInputs + 1;
				this.circuitInputsList.push(inp);

				inputElementSet[inp.getAncestor()] = true;

			}
		}

		/*
		 *          * Iterating through all the outputs, if an output has an empty destinationInputs list
		 *                   * i.e. it does not pass its data value to any other inputs and directly gives to the user,
		 *                            * add this output node as a circuit level output node
		 *                                     */
		for(var it in this.allOutputsList) {
			out = this.allOutputsList[parseInt(it)];
			if (out.getDestinationInputList().length === 0 || out.getstatevalue()==1) {              // Circuit Input Node
				this.numOutputs = this.numOutputs + 1;
				this.circuitOutputsList.push(out);
				outputElementSet[out.getAncestor()] = true;
			}
		}
	};



  /*
   * processCircuit(genericFlag) processes this circuit given all the necessary inputs and
   * populates the final values in its circuit level output nodes
   * If genericFlag is set, the inbuilt Circuit in a generic element wil be processed
   */
  this.processCircuit = function(genericFlag) {
    /*
     * If it is not a generic element and is a normal circuit, identify the circuit level
     inputs and outputs to start processing from circuit level input elements
    */
    //System.out.println("krishna");
    if (!genericFlag) {
      this.identifyCktInputsOutputs();
    }
    for(var it in this.circuitInputsList) {
      if (it.getDataValue() == -1) { // Insufficient Inputs to process circuit
        return false;
      }
    }
    if (!genericFlag) {
      this.identifyCktInputsOutputs();
      for (var it in inputElementSet) {

        ielement = it;
	      processedset = [];
        //Queue<Element> processedset = new LinkedList<Element>();
        if(ielement.getgatedelay()<=0)
        {
          ielement.setgatedelay(1);
        }
	      sk = [];
        //Stack<Element> sk=new Stack<Element>();
        sk.push(ielement);
        while(sk.length !== 0)
          //while(!sk.empty())
        {
          currElement = sk.pop();
          processedset.push(currElement);
          for (var i = 0; i < currElement.getNumOutputs(); i++) {          // Pass on the outputs to next level inputs and add those into the set

            for (var j = 0; j < currElement.getOutputAt(i).getDestinationInputList().length; j++) {
              if(!((currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor()) in processedSet ) && !(( currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor()) in sk))
              {
                


                sk.push(currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor());
                if(currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor().getgatedelay()<=currElement.getgatedelay()+1)
                {
                  currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor().setgatedelay(currElement.getgatedelay()+1);
                }

              }
            }}
        }
      }
      
    }

    /*
     * If there are any inptus without data values(-1), then the circuit cannot be processed
     * return failure in processing the circiut
     */
    
    //System.out.println("a");
    /* for (Iterator it = circuitOutputsList.iterator(); it.hasNext();) {
       Output temp = (Output) it.next();
       if (temp.getstateValue() == 1) { // Insufficient Inputs to process circuit
       for (int j = 0; j < temp.getDestinationInputList().size(); j++) {
       temp.getDestinationInputList().elementAt(j).setDataValue(temp.getDataValue());
       // temp.getDestinationInputList().elementAt(j).setTimeVarying(false);
       // nextSet.add(currElement.getOutputAt(i).getDestinationInputList().elementAt(j).getAncestor());
       }
       }
       }*/


    for(it in this.allInputsList) {
      inp = this.allInputsList[parseInt(it)];
      if (inp.getSourceOutputNode() != null) {
        inp.setNewValue(-1);
      }
      else
      {
        inp.setNewValue(inp.getDataValue());
      }
    }
    firstSet = {};
    Object.assign(firstSet, this.inputElementSet);
    //HashSet<Element> firstSet = new HashSet<Element>(inputElementSet);
 	  nextSet = {};

    /*
     * For each element in currSet,
     * check if all the inputs of the element have proper data values (!=-1)
     * Process the element by calling its processInputs() function
     * Pass on the output values to next level inputs and put them in nextSet
     */
    
    while (firstSet.length !== 0) {
      /* The nextSet of elements for this is cleared before processing currSet*/
	    nextSet = {};
      cycle_count=0;
      for ( var it in firstSet) {
        currElement = it;
        p = 0;
        tempTimeVarying = false;

        /*
         * Check if all inputs are available for processing this currElement and
         * set tempTimeVarying flag if it has atleast one input that varies with time
         * If all inputs are not available, continue with the remaining elements in currSet
         */
        for (var p = 0; p < currElement.getNumInputs(); p++) {
          if (currElement.getInputAt(p).isTimeVarying()) {        // Atleast one input is time varying
            tempTimeVarying = true;
          }
          if (currElement.getInputAt(p).getNewValue() == -1) {   // All inputs are not available
            break;
          }
        }
        if (p != currElement.getNumInputs()) { // Continue as currElement does not have all its inputs available
		      nextSet[currElement] = true;
          cycle_count++;
          continue;
        }

        /*
         * Now that all inputs are available for this element, process Inputs and populate its outputs
         */
        currElement.processInputs();

        /*
         * Feed forward its output values to next level elements to whose inputs it is connected
         * Set its timeVarying flag and also of inputs connected to it to denote that its output value varies with time
         */
        for (var i = 0; i < currElement.getNumOutputs(); i++) {          // Pass on the outputs to next level inputs and add those into the set
          currElement.getOutputAt(i).setTimeVarying(tempTimeVarying);
          for (var j = 0; j < currElement.getOutputAt(i).getDestinationInputList().length; j++) {
            currElement.getOutputAt(i).getDestinationInputList()[j].setDataValue(currElement.getOutputAt(i).getDataValue());
            currElement.getOutputAt(i).getDestinationInputList()[j].setNewValue(currElement.getOutputAt(i).getDataValue());
            currElement.getOutputAt(i).getDestinationInputList()[j].setTimeVarying(tempTimeVarying);
			      nextSet[currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor()] = true;
          }
        }
      }

      /*
       * Assign nextSet to currSet so that the next set of elements can be processed
       * This loop goes on till currSet is empty and its empty when nextSet is empty
       * which means all the elements are processed successfully
       */
      if(firstSet.length==cycle_count)
      {
        break;
      }

 	    firstSet = {};
 	    Object.assign(firstSet, nextSet);
      //firstSet = new HashSet<Element>(nextSet);
    }







	  initial_currSet1 = [];
    for (var it in inputElementSet) {
      initial_currSet1.push(it);
    }

    ele_count=0;ele_count1=0;
    flag_first=0;
    //System.out.println("**************************************");
    while(true)
    {

      //System.out.println("ele_count:"+ele_count1);
    	dif_state1 = {};
	    time_pass = {};
      //Queue<Element> processedset1 = new LinkedList<Element>();
      ele_count=0;

      for (var it in this.allElementsList) {
        currElement = this.allElementsList[parseInt(it)];
        temp_flag=0;temp_flag1=0;
        for (var p_cnt = 0; p_cnt < currElement.getNumInputs(); p_cnt++) {
          
          if (currElement.getInputAt(p_cnt).getNewValue() != -1) {   // All inputs are not available
            temp_flag=1;
          }
          if (currElement.getInputAt(p_cnt).getNewValue() == -1) {   // All inputs are not available
            temp_flag1=1;
          }
          
        }
        if(temp_flag === 0)
        {
	        time_pass[currElement] = true;
        }

        if(temp_flag1==1)
        {
          if(flag_first === 0)
          {
            currElement.setgatedelay(-1);
          }

          if(temp_flag==1)
          {
            temp_max=1;
            for (var p_cnt = 0; p_cnt < currElement.getNumInputs(); p_cnt++) {
              if(currElement.getInputAt(p_cnt).getSourceOutputNode()!==null && currElement.getInputAt(p_cnt).getNewValue() != -1 && (currElement.getInputAt(p_cnt).getSourceOutputNode().getAncestor().getgatedelay()+1)>=temp_max)
              {
                temp_max=currElement.getInputAt(p_cnt).getSourceOutputNode().getAncestor().getgatedelay()+1;
                //System.out.println(currElement.getElementName());
              }
            }
            currElement.setgatedelay(temp_max);
          }
        }




        if(temp_flag==1)
        {
          for (var p_cnt = 0; p_cnt < currElement.getNumInputs(); p_cnt++) {

            if (currElement.getInputAt(p_cnt).getNewValue() == -1) {   // All inputs are not available

              if(currElement.getInputAt(p_cnt).getDataValue()==-1)
              {
                currElement.getInputAt(p_cnt).setDataValue(0);
              }
              currElement.getInputAt(p_cnt).setNewValue(currElement.getInputAt(p_cnt).getDataValue());
              
            }
          }
          ele_count++;
          //    System.out.println(currElement.getElementName());
        }
        
      }
      flag_first=1;
      if(ele_count==ele_count1 || ele_count==allElementsList.length)
      {
        break;
      }
      ele_count1=ele_count;


      loop_flag=0;

      for(var k=0;k<1000;k++)
      {


 	      currSet = [];
 	      Object.assign(currSet, initial_currSet1);



        processedset = [];
        flag=0;
        temp_state="";

        /*
         * For each element in currSet,
         * check if all the inputs of the element have proper data values (!=-1)
         * Process the element by calling its processInputs() function
         * Pass on the output values to next level inputs and put them in nextSet
         */
        //   System.out.println("********************");
        
        while (currSet.length !==0) {
          //    System.out.println("b");
          /* The nextSet of elements for this is cleared before processing currSet*/

          currElement = currSet.shift();
          p = 0;
          tempTimeVarying = false;
          //           System.out.println(currElement.getElementName());
          /*
           * Check if all inputs are available for processing this currElement and
           * set tempTimeVarying flag if it has atleast one input that varies with time
           * If all inputs are not available, continue with the remaining elements in currSet
           */
          check=0;
          for (var p = 0; p < currElement.getNumInputs(); p++) {
            if (currElement.getInputAt(p).isTimeVarying()) {        // Atleast one input is time varying
              //  System.out.println("time varyin");
              tempTimeVarying = true;
            }
            if (currElement.getInputAt(p).getNewValue() == -1) {   // All inputs are not available
              //currElement.getInputAt(p).setDataValue(0);
              check=1;
            }
            // System.out.println(currElement.getElementName()+" "+p+" "+currElement.getInputAt(p).getDataValue());
          }
          if(check==1)
          {
            continue;
          }
          if(currElement in time_pass)
          {
            temp_max=1;
            for (var p_cnt = 0; p_cnt < currElement.getNumInputs(); p_cnt++) {
              if(currElement.getInputAt(p_cnt).getSourceOutputNode()!==null && currElement.getInputAt(p_cnt).getNewValue() != -1 && (currElement.getInputAt(p_cnt).getSourceOutputNode().getAncestor().getgatedelay()+1)>=temp_max)
              {
                temp_max=currElement.getInputAt(p_cnt).getSourceOutputNode().getAncestor().getgatedelay()+1;
                //System.out.println(currElement.getElementName());
              }
            }
            currElement.setgatedelay(temp_max);
	     	    delete time_pass[currElement];
          }
		      temp_out = [];
          for (var p = 0; p < currElement.getNumOutputs(); p++) {
            temp_out.push(currElement.getOutputAt(p).getDataValue());

            temp_state = temp_state + currElement.getOutputAt(p).getDataValue();
          }


          if(currElement.getElementType() == "Generic_Element")
          {
            currElement.setprocess_state(true);
          }
          currElement.processInputs();

          if((currElement.getElementType() == "Generic_Element") && (!currElement.getprocess_state()))
          {
            currElement.setprocess_state(true);
            flag=1;
            k=1000;

            break;
          }

          for (var p = 0; p < currElement.getNumOutputs(); p++) {
            //                  System.out.println(temp_out.elementAt(p) + " "+currElement.getOutputAt(p).getDataValue() ) ;

            if(temp_out[p] != (currElement[p].getDataValue()))

            {
              flag=1;
            }
          }
          processedset.push(currElement);
          /*
           * Feed forward its output values to next level elements to whose inputs it is connected
           * Set its timeVarying flag and also of inputs connected to it to denote that its output value varies with time
           */
          for (var i = 0; i < currElement.getNumOutputs(); i++) {          // Pass on the outputs to next level inputs and add those into the set
            currElement.getOutputAt(i).setTimeVarying(tempTimeVarying);
            //  System.out.println("output:"+k+currElement.getElementName());
            for (var j = 0; j < currElement.getOutputAt(i).getDestinationInputList().length; j++) {
              currElement.getOutputAt(i).getDestinationInputList()[j].setTimeVarying(tempTimeVarying);

              currElement.getOutputAt(i).getDestinationInputList()[j].setDataValue(currElement.getOutputAt(i).getDataValue());
              currElement.getOutputAt(i).getDestinationInputList()[j].setNewValue(currElement.getOutputAt(i).getDataValue());

              if(!( currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor() in processedset) && !(currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor() in currSet ))
              {
                //   System.out.println("input:"+k+currElement.getOutputAt(i).getDestinationInputList().elementAt(j).getAncestor().getElementName());


                currSet.push(currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor());

              }
            }}
        }




        //System.out.println(temp_state);
        if(flag === 0)
        {
          loop_flag=1;
          break;
        }
        if(temp_state in dif_state1)
        {

          break;
        }
        else
        {
          dif_state1[temp_state] = true;
        }
      }

      if(loop_flag === 0)
      {
        break;
      }

    }

    /*
     * currSet is the present set of elements being processed
     * Once each element in currSet is processed, it passes its outputs to next level inputs
     * and their elements are stored in nextSet. After each iteration, currSet is set to nextSet
     * Initially, currSet includes circuit level input elements as they have all their inputs
     */
    initial_currSet = [];
    for (var it in inputElementSet) {
      initial_currSet.push(it);
    }
    dif_state = {};
    for(var k=0;k<1000;k++) {
 	    currSet = [];
 	    Object.assign(currSet, initial_currSet);
      processedset = [];
      flag=0;
      temp_state="";
      /*
       * For each element in currSet,
       * check if all the inputs of the element have proper data values (!=-1)
       * Process the element by calling its processInputs() function
       * Pass on the output values to next level inputs and put them in nextSet
       */
      //   System.out.println("********************");
      while (currSet.length!==0) {
        //    System.out.println("b");
        /* The nextSet of elements for this is cleared before processing currSet*/
        currElement = currSet.shift();
        p = 0;
        tempTimeVarying = false;
        //           System.out.println(currElement.getElementName());
        /*
         * Check if all inputs are available for processing this currElement and
         * set tempTimeVarying flag if it has atleast one input that varies with time
         * If all inputs are not available, continue with the remaining elements in currSet
         */
        for (var p = 0; p < currElement.getNumInputs(); p++) {
          if (currElement.getInputAt(p).isTimeVarying()) { // Atleast one input is time varying
            //  System.out.println("time varyin");
            tempTimeVarying = true;
          }
          if (currElement.getInputAt(p).getDataValue() == -1) {   // All inputs are not available
            currElement.getInputAt(p).setDataValue(0);
          }
          //  System.out.println(currElement.getElementName()+" "+p+" "+currElement.getInputAt(p).getDataValue());
        }
        temp_out = [];
        for (var p = 0; p < currElement.getNumOutputs(); p++) {
          temp_out.push(currElement.getOutputAt(p).getDataValue());
          temp_state = temp_state + currElement.getOutputAt(p).getDataValue();
        }
        if(currElement.getElementType() == "Generic_Element") {
          currElement.setprocess_state(true);
        }
        currElement.processInputs();
        if((currElement.getElementType() == "Generic_Element") && (!currElement.getprocess_state()))
        {
          currElement.setprocess_state(true);
          flag=1;
          k=1000;
          break;
        }

        for (var p = 0; p < currElement.getNumOutputs(); p++) {
          //                  System.out.println(temp_out.elementAt(p) + " "+currElement.getOutputAt(p).getDataValue() ) ;

          if(temp_out[p] != (currElement.getOutputAt(p).getDataValue()))

          {
            flag=1;
          }
        }
        processedset.push(currElement);
        /*
         * Feed forward its output values to next level elements to whose inputs it is connected
         * Set its timeVarying flag and also of inputs connected to it to denote that its output value varies with time
         */
        for (var i = 0; i < currElement.getNumOutputs(); i++) {          // Pass on the outputs to next level inputs and add those into the set
          currElement.getOutputAt(i).setTimeVarying(tempTimeVarying);
          //  System.out.println("output:"+k+currElement.getElementName());
          for (var j = 0; j < currElement.getOutputAt(i).getDestinationInputList().length; j++) {
            currElement.getOutputAt(i).getDestinationInputList()[j].setTimeVarying(tempTimeVarying);

            currElement.getOutputAt(i).getDestinationInputList()[j].setDataValue(currElement.getOutputAt(i).getDataValue());

            if(!( currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor() in processedset) && !( currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor() in currSet))
            {
              //   System.out.println("input:"+k+currElement.getOutputAt(i).getDestinationInputList().elementAt(j).getAncestor().getElementName());


              currSet.push(currElement.getOutputAt(i).getDestinationInputList()[j].getAncestor());

            }
          }}
      }


      //System.out.println(temp_state);
      if(flag===0)
      {
        return true;
      }
      if(temp_state in dif_state)
      {
        break;
      }
      else
      {
        dif_state.push(temp_state);
      }
    }
    for (it in this.allOutputsList) {
      out = this.allOutputsList[parseInt(it)];
      out.setDataValue(-1);

    }
    for (it in this.allInputsList) {
      inp = this.allInputsList[parseInt(it)];
      if (inp.getSourceOutputNode() !== null) {
        inp.setDataValue(-1);
      }
    }
    /*
     * Return success in processing this circuit
     */
    return false;
  };

  /*
   * deleteElement(delID) deletes the element with elementID(delID) from the circuit
   * In the process, it also removes all its connections to other elements and
   * those elements get their inputs from the user or pass on their outputs directly to the user
   * until new connections are defined.
   * The element, its input and output nodes are also removed from corresponding lists.
   */
  this.deleteElement = function(delID) {
    /*
     * Retreive the element data structure from the hashamp allElementsList
     */
    delElement = this.allElementsList[delID];

    /*
     * Delete all its input nodes and their connections to previous output nodes if they exist
     */
    for (var i = 0; i < delElement.getNumInputs(); i++) {
      if (delElement.getInputAt(i).getSourceOutputNode() !== null) {
        delElement.getInputAt(i).getSourceOutputNode().delDestInpNode(delElement.getInputAt(i));
      }
      delete this.allInputsList[delElement.getInputAt(i).getInputID()];
    }

    /*
     * Delete all its output nodes and their connections to next level input nodes
     */
    for (var i = 0; i < delElement.getNumOutputs(); i++) {       // delete all its output nodes and their connections
      for (var j = 0; j < delElement.getOutputAt(i).getDestinationInputList().length; j++) {
        delElement.getOutputAt(i).getDestinationInputList()[j].setSourceOutput(null);
      }
      tmp_list = delElement.getOutputAt(i).getDestInpIdsList();
	    tmp_list = [];
      delete this.allOutputsList[delElement.getOutputAt(i).getOutputID()];
    }

    /*
     * Update the meshType and meshID matices of the circiut with respect to this deleted element, so that its not drawn
     */
    maxExt = delElement.getMaxIO();
    for (var i = -maxExt; i <= maxExt; i++) {
      for (var j = -maxExt; j <= maxExt; j++) {
        meshType[delElement.getLocation().y + j][delElement.getLocation().x + i] = 0;
        meshID[delElement.getLocation().y + j][delElement.getLocation().x + i] = 0;
      }
    }

    /*
     * Remove this element from the list of all the elements in the circuit and
     * re-identify all the circuit level inputs and outputs due to these new modifications
     */
    delete this.allElementsList[delID];
    identifyCktInputsOutputs();
  };


  /*
   * loadCircuit(bufReader) loads a circuit from a previously saved file opened by bufReader in read mode
   * It populates all the variables of a circuit, parsing the file and assigning parameters to constituent elements
   */
  public String loadCircuit(BufferedReader bufReader) throws FileNotFoundException, IOException {
    /*
     * Initialize local variables
     */
    String currentLine = new String();          // current line (non-blank, non-comment[# ...]) being read
    String comment = new String();              // comment line [# ...] being read
    String blankLine = new String();            // blank line being read []

    /*
     * Load metadata about the circuit
     */
    comment = bufReader.readLine();                             // # Circuit ID
    circuitID = Integer.valueOf(bufReader.readLine());
    blankLine = bufReader.readLine();

    comment = bufReader.readLine();                             // # Circuit Name
    circuitName = bufReader.readLine();
    blankLine = bufReader.readLine();

    comment = bufReader.readLine();                             // # Number of Inputs for the whole circuit
    numInputs = Integer.valueOf(bufReader.readLine());
    blankLine = bufReader.readLine();

    comment = bufReader.readLine();                             // # Number of Outputs for the whole circuit
    numOutputs = Integer.valueOf(bufReader.readLine());
    blankLine = bufReader.readLine();


    /*
     * Load the list of all the elements in the circuit
     * The next few comment lines define the format in which the elements were saved
     */
    comment = bufReader.readLine();                             // # Total Number of Elements in the Circuit
    comment = bufReader.readLine();                             // # List of all Elements
    comment = bufReader.readLine();                             // # ID, Name, Location.x, Location.y
    comment = bufReader.readLine();                             // # Num_Inputs_For_Element
    comment = bufReader.readLine();                             // # InputID1, InputIndex, AncestorID, Location.x, Location.y, OutputSrcNode
    comment = bufReader.readLine();                             // # Num_Outputs_For_Element
    comment = bufReader.readLine();                             // # OutputID1, OutputIndex, AncestorID, Location.x, Locaiton.y, NumInpDest, InpId1, InpId2...
    int numElements = Integer.valueOf(bufReader.readLine());        // Number of Elements in the Circuit
    for (int i = 0; i < numElements; i++) {                         // For each such element in the circuit
      Element newElement;
      Scanner scan = new Scanner(bufReader.readLine());                       // Line 1 id, name, x, y
      scan.useDelimiter(", ");
      int id = scan.nextInt();
      String eleName = scan.next();

      /*
       * Based on the type of the element, call the corresponding constructor
       * If its of Generic Element Type, then call the loadCircuit function of the same bufReader
       * to load the inbuilt circuit saved inline to the inbuiltCkt variable of the generic element
       * Then continue with the normal process of loading elements
       */
      if (eleName.startsWith("And_Gate")) {
        newElement = new AndGate();
        newElement.setElementType("And_Gate");
      } else if (eleName.startsWith("Or_Gate")) {
        newElement = new OrGate();
        newElement.setElementType("Or_Gate");
      } else if (eleName.startsWith("Not_Gate")) {
        newElement = new NotGate();
        newElement.setElementType("Not_Gate");
      } else if (eleName.startsWith("Nand_Gate")) {
        newElement = new NandGate();
        newElement.setElementType("Nand_Gate");
      } else if (eleName.startsWith("Nor_Gate")) {
        newElement = new NorGate();
        newElement.setElementType("Nor_Gate");
      } else if (eleName.startsWith("Xor_Gate")) {
        newElement = new XorGate();
        newElement.setElementType("Xor_Gate");
      } else if (eleName.startsWith("Xnor_Gate")) {
        newElement = new XnorGate();
        newElement.setElementType("Xnor_Gate");
      } else if (eleName.startsWith("Generic_Element")) {
        newElement = new GenericElement();
        newElement.setElementType("Generic_Element");
        Circuit genEleCkt = new Circuit();
        genEleCkt.loadCircuit(bufReader);
        newElement.setInbuiltCkt(genEleCkt);
      } else {
        newElement = new Element();
      }

      /*
       * Set the basic properties of the element now that its type has been decided
       */
      newElement.setElementID(id);
      newElement.setElementName(eleName);
      newElement.setLocation(new Point(scan.nextInt(), scan.nextInt()));
      //  System.out.println(eleName);
      /*
       * Load all the inputs for this particular element
       */
      int numInp = Integer.valueOf(bufReader.readLine());                     // Number of Inputs for this element
      for (int j = 0; j < numInp; j++) {                                      // Load parameters of each input of this element
        String line = bufReader.readLine();
        scan = scan.reset();
        scan = new Scanner(line);                                           // Line 2 - inputs for that element
        scan.useDelimiter(", ");
        Input newInp = new Input(scan.nextInt(), scan.nextInt(), newElement,scan.next());
        int ancestorID = scan.nextInt();
        newInp.setLocation(new Point(scan.nextInt(), scan.nextInt()));
        int srcOutID = scan.nextInt();
        if (srcOutID == -1) {                                               // if srcOutID is -1 => its a cirucit level input
          newInp.setSourceOutput(null);
        } else {
          newInp.setSourceOutput(allOutputsList.get(srcOutID));
        }

        /*
         * Add this input to the list of inputs that belong to this element and
         * also to the aggregate list of all input nodes present in the circuit
         */
        newElement.addInput(newInp);
        allInputsList.put(newElement.getInputAt(j).getInputID(), newElement.getInputAt(j));
      }

      /*
       * Load all the outputs for this particular element
       */
      int numOut = Integer.valueOf(bufReader.readLine());                     // Number of Outputs for this element
      for (int j = 0; j < numOut; j++) {                                      // Load parameters for each output of this element
        String line = bufReader.readLine();
        scan = scan.reset();
        scan = new Scanner(line);                                           // Line 3 - outputs for that element
        scan.useDelimiter(", ");
        Output newOut = new Output(scan.nextInt(), scan.nextInt(), newElement, scan.next());
        int parentID = scan.nextInt();                                      // ancestorID
        newOut.setLocation(new Point(scan.nextInt(), scan.nextInt()));
        int numDestInp = scan.nextInt();                                    // number of inputs to which this output is connected


        /*
         * First, store a list of the ids of all the inputs to which this output is connected
         * The destinationInputsList can be populated once all the inputs of all the elements have been read
         */
        for (int k = 0; k < numDestInp; k++) {
          int inpid = scan.nextInt();
          newOut.addDestInpId(inpid);
        }

        /*
         * Add this output to the list of outputs that belong to this element and
         * also to the aggregate list of all outputs that are present in the circuit
         */
        newElement.addOutput(newOut);
        allOutputsList.put(newElement.getOutputAt(j).getOutputID(), newElement.getOutputAt(j));
      }

      /*
       * Finally, add this element (fully populated) to the list of constituent elements present in the circuit
       * Also update the mesh Matrices with respect to this element so that it is drawn
       */
      allElementsList.put(newElement.getElementID(), newElement);
      newElement.updateMatrix(newElement.getLocation(), meshType, meshID, null);
      scan.close();
    }
    blankLine = bufReader.readLine();

    /*
     * Now that all the elements are read and so are their input nodes,
     * for every output of every element, using the destination input ids stored before,
     * add their corresponding input nodes to the destinationInputs list for that particular output node
     */
    for (Iterator it = allElementsList.keySet().iterator(); it.hasNext();) {
      Element ele = (Element) allElementsList.get((Integer) it.next());
      for (int i = 0; i < ele.getNumOutputs(); i++) {
        Output out = ele.getOutputAt(i);
        for (int j = 0; j < out.getDestInpIdsList().size(); j++) {
          out.addDestinationInput(allInputsList.get(out.getDestInpIdsList().elementAt(j)));
          allInputsList.get(out.getDestInpIdsList().elementAt(j)).setSourceOutput(out);

        }
        ele.getOutputList().setElementAt(out, i);
        allOutputsList.put(out.getOutputID(), out);
      }
    }


    /*
     * Load a list of inputs that act as inputs for the entire circuit
     * i.e. circuit level inputs, those inputs to which the user needs to feed values
     */
    comment = bufReader.readLine();                                     // # Num_Inputs_For_Whole_Circuit, InpID1, InpID2, InpID3...
    Scanner scanIO = new Scanner(bufReader.readLine());
    scanIO.useDelimiter(", ");
    numInputs = scanIO.nextInt();
    while (scanIO.hasNextInt()) {
      this.circuitInputsList.add(allInputsList.get(scanIO.nextInt()));
    }
    blankLine = bufReader.readLine();


    /*
     * Load a list of outputs that act as inputs for the entire circuit
     * i.e. circuit level outputs, those outputs which directly give their values to the user
     */
    comment = bufReader.readLine();                                     // # Num_Outputs_For_Whole_Circuit, OutID1, OutID2, OutID3...
    scanIO.reset();
    scanIO = new Scanner(bufReader.readLine());
    scanIO.useDelimiter(", ");
    numOutputs = scanIO.nextInt();
    while (scanIO.hasNextInt()) {
      Output op1 = allOutputsList.get(scanIO.nextInt());
      op1.setstatevalue(1);
      this.circuitOutputsList.add(op1);
    }
    blankLine = bufReader.readLine();


    /*
     * Load a list of elements that act as inputs for the entire circuit
     * i.e. those elements that have atleast one circuit level input
     */
    comment = bufReader.readLine();                                     // # Num_Input_Elements_For_Whole_Circuit, ElementID1, ElementID2, ElementID3...
    scanIO.reset();
    scanIO = new Scanner(bufReader.readLine());
    scanIO.useDelimiter(", ");
    int temp = scanIO.nextInt();
    while (scanIO.hasNextInt()) {
      this.inputElementSet.add(allElementsList.get(scanIO.nextInt()));
    }
    blankLine = bufReader.readLine();


    /*
     * Load a list of outputs that act as inputs for the entire circuit
     * i.e. those elements that have atleast one circuit level output
     */
    comment = bufReader.readLine();                                     // # Num_Output_Elements_For_Whole_Circuit, ElementID1, ElementID2, ElementID3...
    scanIO.reset();
    scanIO = new Scanner(bufReader.readLine());
    scanIO.useDelimiter(", ");
    temp = scanIO.nextInt();
    while (scanIO.hasNextInt()) {
      outputElementSet.add(allElementsList.get(scanIO.nextInt()));
    }

    /*
     * Return a success statement to the parent function
     */
    return ("circuit loaded successfully!");
  }

  /*
   * saveCircuit(filename, append) function saves the current active circuit being modified
   * into a file denoted by the string filename.
   * If append is true, the file is appended - this is used to save the inbuilt circuit in generic elements
   * If false, the file is opened in write mode and used to save the entire circuit as a whole
   */
  public String saveCircuit(String filename, boolean append) throws FileNotFoundException, IOException {
    /*
     * Open the file represented by the string filename in append mode if append is set.
     * Create a printstream that's used to write output strings to the file
     */
    BufferedOutputStream bufStream = new BufferedOutputStream(new FileOutputStream(filename, append));
    PrintStream p = new PrintStream(bufStream);

    /*
     * Identify circuit level inputs and outputs before saving to the file
     * This would be the last saved state of the circuit
     */
    identifyCktInputsOutputs();
    // System.out.println("Saving current circiut to file : " + filename);

    /* Store metadata about the circuit - ID, Name, NumInputs and NumOutputs */
    p.println("# Circuit ID\n" + this.circuitID);
    p.println("\n# Circuit Name\n" + this.circuitName);
    p.println("\n# Number of Inputs for the whole circuit\n" + this.numInputs);
    p.println("\n# Number of Outputs for the whole circuit\n" + this.numOutputs);


    /* Explain the format in which all the elements are stored */
    p.println("\n# Total Number of Elements in the Circuit");
    p.println("# List of all Elements");
    p.println("# ID, Name, Location.x, Location.y");
    p.println("# Num_Inputs_For_Element");
    p.println("# InputID1, InputIndex, AncestorID, Location.x, Location.y, OutputSrcNode");
    p.println("# Num_Outputs_For_Element");
    p.println("# OutputID1, OutputIndex, AncestorID, Location.x, Locaiton.y, NumInpDest, InpId1, InpId2... ");
    p.println(this.allElementsList.size());

    /*
     * For every element, store all its member variables in the above format line-wise
     */
    for (Iterator it = allElementsList.keySet().iterator(); it.hasNext();) {
      Element currElement = (Element) allElementsList.get((Integer) it.next());
      p.print(currElement.getElementID() + ", " + currElement.getElementName() + ", ");
      p.println(currElement.getLocation().x + ", " + currElement.getLocation().y);

      /*
       * If the element is a generic element, it has an inbuilt circuit that also needs to be saved
       * So, close the print and buffer streams and call save circuit with the inbuiltCkt variable
       * Once the inbuilt circuit is saved inline, reopen the print and buffer streams in append mode
       * and continue saving the details of this element just as every other element
       */
      if (currElement.getElementType().equals("Generic_Element")) {
        p.close();
        bufStream.close();
        currElement.getInbuiltCircuit().saveCircuit(filename, Boolean.TRUE);
        bufStream = new BufferedOutputStream(new FileOutputStream(filename, Boolean.TRUE));
        p = new PrintStream(bufStream);
      }

      /*
       * Save all the inputs for this particular element, each in a single line with all its properties
       */
      p.println(currElement.getNumInputs());
      for (int i = 0; i < currElement.getInputList().size(); i++) {
        Input currInp = currElement.getInputAt(i);
        p.print(currInp.getInputID() + ", " + currInp.getInputIndex() + ", " +currInp.getname()+", "+ currInp.getAncestor().getElementID());
        p.print(", " + currInp.getLocation().x + ", " + currInp.getLocation().y);
        if (currInp.getSourceOutputNode() == null) {
          p.print(", -1");
        } else {
          p.print(", " + currInp.getSourceOutputNode().getOutputID());
        }
        p.print("\n");
      }

      /*
       * Save all the outputs for this particular element, each in a single line with all its properties
       * With respect to destinationInputsList, first store the size and then a list of all their ids, -1 if null
       */
      p.println(currElement.getNumOutputs());
      for (int i = 0; i < currElement.getOutputList().size(); i++) {
        Output currOut = currElement.getOutputAt(i);
        p.print(currOut.getOutputID() + ", " + currOut.getOutputIndex() + ", " +currOut.getname()+", "+ currOut.getAncestor().getElementID());
        p.print(", " + currOut.getLocation().x + ", " + currOut.getLocation().y);
        p.print(", " + currOut.getDestinationInputList().size());
        for (int j = 0; j < currOut.getDestinationInputList().size(); j++) {
          if (currOut.getDestinationInputList().elementAt(j) == null) {
            p.print(", -1");
          } else {
            p.print(", " + currOut.getDestinationInputList().elementAt(j).getInputID());
          }
        }
        p.print("\n");
      }
    }


    /*
     * Store a list of inputs that act as inputs for the entire circuit
     */
    p.println("\n# Num_Inputs_For_Whole_Circuit, InpID1, InpID2, InpID3...");
    p.print(this.circuitInputsList.size());
    for (int i = 0; i < circuitInputsList.size(); i++) {
      p.print(", " + circuitInputsList.elementAt(i).getInputID());
    }
    p.print("\n");

    /*
     * Store a list of outputs that act as outputs for the entire circuit
     */
    p.println("\n# Num_Outputs_For_Whole_Circuit, OutID1, OutID2, OutID3...");
    p.print(this.circuitOutputsList.size());
    for (int i = 0; i < circuitOutputsList.size(); i++) {
      p.print(", " + circuitOutputsList.elementAt(i).getOutputID());
    }
    p.print("\n");

    /*
     * Store a list of elements that act as input elements - first level - for the entire circuit
     */
    p.println("\n# Num_Input_Elements_For_Whole_Circuit, ElementID1, ElementID2, ElementID3...");
    p.print(this.inputElementSet.size());
    for (Iterator it = inputElementSet.iterator(); it.hasNext();) {
      p.print(", " + ((Element) it.next()).getElementID());
    }
    p.print("\n");

    /*
     * Store a list of elements that act as output elements - final level - for the entire circuit
     */
    p.println("\n# Num_Output_Elements_For_Whole_Circuit, ElementID1, ElementID2, ElementID3...");
    p.print(this.outputElementSet.size());
    for (Iterator it = outputElementSet.iterator(); it.hasNext();) {
      p.print(", " + ((Element) it.next()).getElementID());
    }
    p.print("\n");

    /*
     * Close the print and buffer streams and return a success statement to the parent function
     */
    p.close();
    bufStream.close();
    return ("Done Saving the Circuit to " + filename);
  }
}
}
