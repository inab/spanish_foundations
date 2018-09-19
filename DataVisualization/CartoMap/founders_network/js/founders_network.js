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
var storedEdges = [];
var fundacionBuscada = "";

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
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							elementsArray.push({ data: { id: response.data.rows[i].nombre, nodeShape: 'circle' }, classes: 'fundador' });
						}
				SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(nombre_fundacion) FROM founders_v1 WHERE nombre_fundacion IN (" + buscada + ")"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Foundations names
						//console.log('Foundations names');
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							
							if(response.data.rows[i].nombre_fundacion === fundacionBuscada) {
							//console.log('holaaaaaaaaaa');
							//console.log(response.data.rows[i].nombre_fundacion);
							elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'buscado' });
							//elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
							} else{
							elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
							}
						}
						SQL_CLIENT.request({
                    params: {
                        q: "SELECT nombre,nombre_fundacion FROM founders_v1 WHERE nombre_fundacion IN (" + buscada + ")"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Edges
						//console.log('Edges');
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							//elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion } });		
							var collapsed = false;
							for(var l = 0; l < storedEdges.length; l++) {
								if(storedEdges[l].source === response.data.rows[i].nombre.trim() && storedEdges[l].target === response.data.rows[i].nombre_fundacion.trim()) {
									//console.log('Colapsing hash map');
									collapsed = true;
									break;
								}
							}
							
							if(collapsed) {
								continue;
							}
							
							//storedEdges.push({ 'source': response.data.rows[i].nombre.trim(), 'target': response.data.rows[i].nombre_fundacion.trim()});
							//console.log('prueba map2')
							//console.log('origen2 --');
							//console.log(response.data.rows[i].nombre);
							//console.log('destino2 --');
							//console.log(response.data.rows[i].nombre_fundacion);
							
							var edgeId = response.data.rows[i].nombre + response.data.rows[i].nombre_fundacion;
							elementsArray.push({
              data: {
                id: edgeId,
                source: response.data.rows[i].nombre,
                target: response.data.rows[i].nombre_fundacion,
				nodeShape: 'circle'
              }
            });
						}
						
						resolve(elementsArray);
								}})
                .catch(function (error) {
                    reject(Error(error));
                });
				}})
                .catch(function (error) {
                    reject(Error(error));
                });
				}})
                .catch(function (error) {
                    reject(Error(error));
                });
});
}

var getFoundationsAndConnectionsByFounderPromise = function(founderName) { return new Promise(function(resolve, reject) {
	
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
						if(response.data.rows.length == 1) {
							reject(Error('super error'));
						}
						//console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							if(response.data.rows[i].nombre_fundacion === fundacionBuscada) {
								//console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2222222222222222');
								elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'buscado' });
							} else {
								elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
							}
							var edgeId = buscada + response.data.rows[i].nombre_fundacion;							
							var collapsed = false;
							for(var l = 0; l < storedEdges.length; l++) {
								if(storedEdges[l].source === buscada.replace(/''/g, "'").trim() && storedEdges[l].target === response.data.rows[i].nombre_fundacion.trim()) {
									//console.log('Colapsing hash map');
									collapsed = true;
									break;
								}
							}
							
							if(collapsed) {
								continue;
							}
		
							
							
							storedEdges.push({ 'source': buscada.replace(/''/g, "'").trim(), 'target': response.data.rows[i].nombre_fundacion.trim()});
							elementsArray.push({
              data: {
                id: edgeId,
                source: buscada.replace(/''/g, "'"),
                target: response.data.rows[i].nombre_fundacion,
				nodeShape: 'circle'
              }
            });
						}
						var elementsPerFoundationPromises = []
						for(var z = 0; z < elementsArray.length; z++) {
							if(elementsArray[z].classes === "fundacion") {
								//console.log('yes soy una fundacion:');
								//console.log(elementsArray[z].data.id);
								elementsPerFoundationPromises.push(getFoundersPromise(elementsArray[z].data.id).then(function(result) {
									
				return(result);
}, function(err) {
  console.log(err); // Error
}));
	Promise.all(elementsPerFoundationPromises).then(data => {
				//console.log('wtf2!');
				//console.log(data);
				for (var z = 0; z < data.length; z++) {
				for (var t = 0; t < data[z].length; t++) {
					elementsArray.push(data[z][t]);
				}
				}
	//console.log('acabose2!!');
	//console.log(elementsArray);
	resolve(elementsArray);
	//paintCytoscapeNetwork(elementsArray);
	//console.log(storedEdges);
  });
							}
						}
			
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
	elementsArray = data;
	console.log('Printing network');
		//console.log(elementsArray.length);
	
        var cy = cytoscape({
          container: document.getElementById('cy'),
          elements: elementsArray,
          style: 
			cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 25,
        'width': 25,
        'shape': 'data([nodeShape])',
		label: 'data(id)',
		'font-size': 18,
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
		shape: 'hexagon'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
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
                    name: 'cose-bilkent',

        // Called on `layoutready`
  ready: function () {
  },
  // Called on `layoutstop`
  stop: function () {
  },
  // Whether to include labels in node dimensions. Useful for avoiding label overlap
  nodeDimensionsIncludeLabels: false,
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
  numIter: 2500,
  // Whether to tile disconnected nodes
  tile: true,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: 'end',
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
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5
                }
        });
		
		cy.pan({ x: 0, y: 0 });
		cy.zoom(0.5);
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
		var dataForNetwork = [];
	fundacionBuscada = foundationName;
	getFoundersPromise(fundacionBuscada).then(function(result) {
		dataForNetwork.push(result);
		//console.log('Data1');
		//console.log(dataForNetwork);
		storedEdges = [];
		var finalResult = [];
			
			founderPromises = []
			
			
			// Get connections of each founder (level-2 relations)
			for (var z = 0; z < dataForNetwork.length; z++) {
				for (var t = 0; t < dataForNetwork[z].length; t++) {
					if(dataForNetwork[z][t].classes === "fundador") {
						//console.log('Busqué a:');
							//console.log(dataForNetwork[z][t].data.id);
							
						founderPromises.push(getFoundationsAndConnectionsByFounderPromise(dataForNetwork[z][t].data.id).then(function(result) {
						
console.log('abcd');
console.log(result);	
paintCytoscapeNetwork(result);					
	return(result);
  		
}, function(err) {
	//console.log('abcdddd');
  console.log(err); // Error
}));
					}
					
				}
			}
			
			// And now gather all the results in the final version
			var alreadyPainted = false;
			Promise.all(founderPromises).then(data => {
				//console.log('wtf');
				if(data[0]) {
				//console.log(data);
				for (var z = 0; z < data.length; z++) {
					if(!data[z]) {
						break;
					}
				for (var t = 0; t < data[z].length; t++) {
					finalResult.push(data[z][t]);
				}
				}
				} else {
					finalResult = dataForNetwork[0];
					//paintCytoscapeNetwork(finalResult);
					alreadyPainted = true;
				}
	//console.log('acabose');
	//console.log(finalResult);
	//finalResult = removeDuplicates(finalResult);
	//console.log('Pintar ahora');
	if(!alreadyPainted) {
		// Aqui tengo algo
	//paintCytoscapeNetwork(finalResult);
	}
  });
  		
  		
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