 /* create an axios client to the SQL API */
            var API_KEY = '9d3d3e19781c35ce76c075e4cfe9d5caa1604ce9',
                USER_NAME = 'carto-bsc',
                SQL_CLIENT = axios.create({
                    method: 'get',
                    url: 'https://' + USER_NAME + '.carto.com/api/v2/sql?',
                    params: {
                        api_key: API_KEY
                    }
                });

				function stringToUint(string) {
    var string = btoa(unescape(encodeURIComponent(string))),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}

// Global vars
var fundacionesConNodo = [];
var fundadoresConNodo = [];
var tempFundadores = [];
var tempFundaciones = [];
var storedEdges = [];
var fundacionBuscada = "";
var cantidadNodos = 0;
var cantidadEdges = 0;

// Promises
var getFoundersPromise = function(foundationName) { return new Promise(function(resolve, reject) {
	
	var buscada = foundationName;
	buscada = buscada.replace(/'/g, "''");
	buscada = "'" + buscada + "'";
	//console.log(buscada);
	var query1 = "SELECT DISTINCT(nombre) FROM founders_v1 WHERE nombre IN (SELECT nombre FROM founders_v1 WHERE nombre_fundacion IN (" + buscada + "))";
	var elementsArray = [];
	
	// SQL
		SQL_CLIENT.request({
                    params: {
                        q: query1
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Founders names
						if(!fundacionesConNodo.includes(foundationName)) {
						elementsArray.push({ data: { id: foundationName, nodeShape: 'triangle' }, classes: 'buscado' });
						fundacionesConNodo.push(foundationName);
						}
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							if(!fundadoresConNodo.includes(response.data.rows[i].nombre)) {
							elementsArray.push({ data: { id: response.data.rows[i].nombre, nodeShape: 'circle'}, classes: 'fundador' });
							fundadoresConNodo.push(response.data.rows[i].nombre);
							var edgeId = response.data.rows[i].nombre + foundationName;
							elementsArray.push({ data: { 'id': edgeId, 'source': response.data.rows[i].nombre, 'target': foundationName, nodeShape: 'circle'}, classes: 'edge'});
							}
						}
						//elementsArray.push({ data: { id: foundationName, nodeShape: 'triangle' }, classes: 'buscado' });						
						resolve(elementsArray);
								}})
                .catch(function (error) {
                    reject(Error(error));
                });
});
}

var getFoundationsByFounderPromise = function(founderName) { return new Promise(function(resolve, reject) {
	
	var buscada = founderName;
	
	
	buscada = buscada.replace(/'/g, "''");
	
	if(buscada.charAt(0) !== "'") {
		//console.log('holaaaaaaaaaaaa');
		//console.log(buscada);
	}
	//console.log('hola pepito');
	//console.log(buscada);
	var query1 = "SELECT DISTINCT(nombre_fundacion) FROM founders_v1 WHERE nombre IN ('" + buscada + "')";
	var elementsArray = [];
	
	// SQL
		SQL_CLIENT.request({
                    params: {
                        q: query1
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						//elementsArray.push({ data: { id: buscada, nodeShape: 'circle' }, classes: 'fundador' });
						// Founders names
						//console.log('Respuesta:');
						//console.log(response);
						/*if(response.data.rows.length == 1) {
							reject(Error('super error'));
						}*/
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							if(!fundacionesConNodo.includes(response.data.rows[i].nombre_fundacion)) {
								fundacionesConNodo.push(response.data.rows[i].nombre_fundacion);
								elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
								
								// Edge
								elementsArray.push({ data: { 'source': buscada.replace(/''/g, "'").trim(), 'target': response.data.rows[i].nombre_fundacion.trim()}, nodeShape: 'circle', classes: 'edge'});
							
							}
							
							if(!fundadoresConNodo.includes(buscada.replace(/''/g, "'"))) {
								fundadoresConNodo.push(buscada.replace(/''/g, "'"));
								elementsArray.push({ data: { id: buscada.replace(/''/g, "'"), nodeShape: 'circle' }, classes: 'fundador' });
							}
							
							var edgeId = buscada + response.data.rows[i].nombre_fundacion;								
		
							
							
						}
			
								resolve(elementsArray);
								}})
                .catch(function (error) {
					console.log('Super error');
					console.log(error);
                    reject(Error(error));
                });
});
}
//

function paintCytoscapeNetwork(data) {
	for(var i = 0; i < data.length; i++) {			
			if(data[i].classes != "edge" ) {
				cantidadNodos++;
			} else {
				cantidadEdges++;
			}
		}
		
	console.log('Printing network');
	var timeToPrint = 0;
	var layoutToUse = "cola";
	var labelSize = 24;
	var separacionEdges = cantidadNodos;
	var separacionNodos = cantidadNodos/15;
	if(cantidadNodos < 500) {
	timeToPrint = cantidadNodos * 40 * 2.5;
	}
	
	if(cantidadNodos < 300) {
		timeToPrint = cantidadNodos * 40 * 2.5;
	}
	if(cantidadNodos >= 500) {
		timeToPrint = cantidadNodos * 40 * 2.5;
		separacionEdges = cantidadNodos / 3;
		separacionNodos = cantidadNodos/15;
	}
	
	if(cantidadNodos < 100) {
		separacionEdges = cantidadNodos*4;
	}
	console.log('Time to print');
	console.log(timeToPrint);
	
	/*if(cantidadEdges < 10) {
		separacionEdges = cantidadNodos;
		separacionNodos = cantidadNodos;
		layoutToUse = "grid";
	}*/
	
	if(cantidadNodos < 20) {
		separacionEdges = cantidadNodos*20;
		separacionNodos = cantidadNodos/15;
	}
	
	if(cantidadNodos < 3) {
		separacionEdges = cantidadNodos*100;
		separacionNodos = cantidadNodos/10;
	}
	
	
	console.log('Cantidad nodos:');
	console.log(cantidadNodos);
	console.log('Cantidad edges:');
	console.log(cantidadEdges);
		//console.log(elementsArray.length);
	
        var cy = cytoscape({
          container: document.getElementById('cy'),
          elements: data,
          style: 
			cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 25,
        'width': 25,
        'shape': 'data([nodeShape])',
		label: 'data(id)',
		'font-size': labelSize,
        'border-color': '#000',
		'background-color': '#E8747C',
        'border-width': 3,
        'border-opacity': 0.5
      })
	  
    .selector('.fundacion')
      .css({
        'border-color': 'red',
		'background-color': '#74CBE8',
		shape: 'diamond'
      })
	  .selector('.buscado')
      .css({
		'border-color': 'green',
		'background-color': '#42f44b',
		shape: 'diamond'
      })
    .selector('edge')
      .css({
        'curve-style': 'haystack',
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })	  
	  .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'opacity': 1
      }),
          layout: {
                    name: layoutToUse,
					//circle: true, // put depths in concentric circles if true, put depths top down if false

        // Called on `layoutready`
  ready: function () {
  },
  // Called on `layoutstop`
  stop: function () {
  },
  // Whether to include labels in node dimensions. Useful for avoiding label overlap
  nodeDimensionsIncludeLabels: true,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 30,
  // Whether to enable incremental mode
  randomize: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 150000,
  // Ideal (intra-graph) edge length
  idealEdgeLength: 50,
  // Divisor to compute edge forces
  edgeElasticity: 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 0.25,
  // Maximum number of iterations to perform
  numIter: 1,
  // Whether to tile disconnected nodes
  tile: false,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: 'false',
  // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingVertical: 10,
  // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  textureOnViewport: true,
  hideEdgesOnViewport: true,
  hideLabelsOnViewport: true,
  pixelRatio: 1,
  // Cola New
  animate: true, // whether to show the layout as it's running
  refresh: 5, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: timeToPrint, // max length in ms to run the layout
  ungrabifyWhileSimulating: true, // so you can't drag nodes during layout
  fit: false, // on every layout reposition of nodes, fit the viewport
  padding: 0, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node

  // layout event callbacks
  ready: function(){}, // on layoutready
  stop: function(){
	  document.getElementById("loader").style.display = "none";
  }, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout
  avoidOverlap: true, // if true, prevents overlap of node bounding boxes
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  nodeSpacing: function( node ){ return separacionNodos; }, // extra spacing around nodes
  //flow: { axis: 'y', minSeparation: 200 }, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
  flow: undefined,
  alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
  gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]. The constraint in the example says that the center of node1 must be at least 25 pixels above the center of node2. In other words, it is an inequality constraint that requires "node1.y + gap <= node2.y". You can set the extra "equality" attribute as "true" to convert it into an equality constraint.

  // different methods of specifying edge length
  // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
  edgeLength: separacionEdges, // sets edge length directly in simulation
  edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
  edgeJaccardLength: undefined, // jaccard edge length in simulation

  // iterations of cola algorithm; uses default values on undefined
  unconstrIter: undefined, // unconstrained initial layout iterations
  userConstIter: undefined, // initial layout iterations with user-specified constraints
  allConstIter: undefined, // initial layout iterations with all constraints including non-overlap

  // infinite layout options
  infinite: false, // overrides all other options for a forces-all-the-time mode
  //
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5
                }
        });
		
		//cy.pan({ x: 0, y: 0 });
		if(cantidadNodos < 3) {
			//cy.zoom(0);
		}
		//cy.zoom(0.5);
		
		// Start listening to events
		/*cy.on('render', function(evt) {
    console.log('event heard: render');    
});*/

cy.on('ready', function(evt) {
    console.log('Event heard: ready');
	//document.getElementById("loader").style.display = "none";
    
});


}

function removeDuplicates(arrayOfObjects) {
	theArray = arrayOfObjects;
	for(var i = 0; i < theArray.length; i++) {
		if(theArray[i].data.id.charAt(0) === "'") {
			//console.log(theArray[i].data.id);
		}
	}
	return theArray;
}

function updateNetwork(foundationName) {
	getFoundersPromise(foundationName).then(function(result) {
		//console.log(result);
		//paintCytoscapeNetwork(result);
  		
}, function(err) {
  console.log(err); // Error
});	
	
}

function mergeJsonResults(first, second) {
	var mergedResults = []
	
	for(var i = 0; i < first.length; i++) {
		mergedResults.push(first[i]);
	}
	
	for(var i = 0; i < second.length; i++) {
		mergedResults.push(second[i]);
	}
	
	return mergedResults;
}

function startNetworkByFoundation(foundationName) {
		var dataForNetwork;
	fundacionBuscada = foundationName;
	console.log('Empiezo la busqueda del grafo');
	getFoundersPromise(fundacionBuscada).then(function(result) {
		//dataForNetwork.push(result);
		console.log(result);
		var arrayFundadores = []
		var promisesFounders = [];
		// Promises for each of the founders in tempFundadores foundations
		for(var i = 0; i < result.length; i++) {
			if(result[i].classes == "fundador") {
				console.log(result[i].data.id);
				promisesFounders.push(getFoundationsByFounderPromise(result[i].data.id));
			}
		}
		
		dataForNetwork = result;
		
		// Wait for promises for each of the founders in tempFundadores foundations
		// and store the new Foundations added to fetch their founders afterwards
		tempFundaciones = []
		
		Promise.all(promisesFounders).then(data => {
			console.log('promise all!');
			for(var j = 0; j < data.length; j++) {
				if(data[j].length > 0) {
					for(var z = 0; z < data[j].length; z++) {
						dataForNetwork.push(data[j][z]);
						if(data[j][z].classes == "fundacion") {
							tempFundaciones.push(data[j][z].data.id);
						}
					}
				}
			}
			console.log(dataForNetwork); 
			console.log('temp fundaciones');
			console.log(tempFundaciones);
			
			// Create the promises for the tempFundaciones
			var promisesFundaciones = [];
			for(var j = 0; j < tempFundaciones.length; j++) {
				promisesFundaciones.push(getFoundersPromise(tempFundaciones[j]));
			}
			
			// Wait for it
			tempFundadores = []
			tempFundaciones = []
			
			Promise.all(promisesFundaciones).then(data => {
				console.log('Mirame!');
				for(var j = 0; j < data.length; j++) {
				if(data[j].length > 0) {
					for(var z = 0; z < data[j].length; z++) {
						dataForNetwork.push(data[j][z]);
						if(data[j][z].classes == "fundador") {
							tempFundadores.push(data[j][z].data.id);
						}
					}
				}
				}
				
				promisesFounders = [];
				// Create the promises for the tempFundadores
				// Promises for each of the founders in tempFundadores foundations
				for(var j = 0; j < tempFundadores.length; j++) {
					promisesFounders.push(getFoundationsByFounderPromise(tempFundadores[j]));
				}
				
				// Level 3: Dangerous!! RAM dies :D
				// Wait for it
				/*Promise.all(promisesFounders).then(data => {
					console.log('Mirame2!');
					for(var j = 0; j < data.length; j++) {
						if(data[j].length > 0) {
							for(var z = 0; z < data[j].length; z++) {
								dataForNetwork.push(data[j][z]);
								if(data[j][z].classes == "fundacion") {
									tempFundaciones.push(data[j][z].data.id);
								}
							}
						}
					}
					
					// This is the founders in level 3 relations, if you add, it dies for sure (RAM)
					
					
					// And now get the founders of the new foundations in tempFundaciones
					/*promisesFundaciones = []
					for(var j = 0; j < tempFundaciones.length; j++) {
						promisesFundaciones.push(getFoundersPromise(tempFundaciones[j]));
					}
					
					// Wait for it
					Promise.all(promisesFundaciones).then(data => {
					console.log('Mirame3!');
					for(var j = 0; j < data.length; j++) {
						if(data[j].length > 0) {
							for(var z = 0; z < data[j].length; z++) {
								dataForNetwork.push(data[j][z]);
							}
						}
					}
					
					paintCytoscapeNetwork(dataForNetwork);
					});
					
					console.log("Number of elements to print: " + dataForNetwork.length);
					paintCytoscapeNetwork(dataForNetwork);
	
				});*/
				
				paintCytoscapeNetwork(dataForNetwork);
				
				
			
			});
			
			//paintCytoscapeNetwork(dataForNetwork);
		});
		
		//paintCytoscapeNetwork(result);
		//console.log(dataForNetwork);

			// Test
			/*getFoundationsByFounderPromise("CAJA DE AHORROS Y MONTE DE PIEDAD DE BALEARES").then(function(result) {
				console.log('test2');
				console.log(result);
				for(var j = 0; j < result.length; j++) {
					dataForNetwork.push(result[j]);
				}
				paintCytoscapeNetwork(dataForNetwork);
			}, function(err) {
  console.log(err); // Error
});*/
  		
}, function(err) {
  console.log(err); // Error
});
}
				
$( document ).ready(function() {
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var foundationParam = url.searchParams.get("fundacion");
	//console.log('Parametro:');
	//console.log(foundationParam);
	//startNetworkByFoundation("BANCARIA CAIXA D' ESTALVIS I PENSIONS DE BARCELONA, \"LA CAIXA\"");
	startNetworkByFoundation(foundationParam);
	//updateNetwork("BANCARIA CAIXA D' ESTALVIS I PENSIONS DE BARCELONA, \"LA CAIXA\"");
});