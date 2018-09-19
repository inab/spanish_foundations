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
				
function updateNetwork(ccaaName) {
	elementsArray = [];
	console.log("SELECT DISTINCT(nombre) FROM founders_v1 WHERE nombre IN (SELECT nombre FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad IN " + ccaaName + "))");
	SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(nombre) FROM founders_v1 WHERE nombre IN (SELECT nombre FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad IN " + ccaaName + "))"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Founders names
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							elementsArray.push({ data: { id: response.data.rows[i].nombre, nodeShape: 'circle' } });
						}
				SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(nombre_fundacion) FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad IN " + ccaaName + ")"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Foundations names
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
						}
						SQL_CLIENT.request({
                    params: {
                        q: "SELECT nombre,nombre_fundacion FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad IN " + ccaaName + ")"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Edges
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							//elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion } });
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
						
												// Print the network
						console.log('Printing network');
						console.log(elementsArray.length);
	
        var cy = cytoscape({
          container: document.getElementById('cy'),
          elements: elementsArray,
          style: 
			cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 50,
        'width': 50,
        'shape': 'data([nodeShape])',
		label: 'data(id)',
        'border-color': '#000',
		'background-color': '#E8747C',
        'border-width': 3,
        'border-opacity': 0.5
      })
	  
    .selector('.fundacion')
      .css({
        'border-color': 'red',
		'background-color': '#74CBE8',
		shape: 'circle'
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
                    name: 'cola',

        animate: true,
		randomize: true, fit: true, maxSimulationTime: 4000,
		padding: 10, refresh: 1, ungrabifyWhileSimulating: false,
		nodeSpacing: 5 /*20*/, 
    edgeLengthVal: 45 /*10*/,
    edgeLength: 45
                }
        });
		
		/*cy.reset();
		var pos = cy.nodes("#ARTE Y TECNOLOGÍA").position();
cy.zoom({
  level: 1.5,
  position: pos
});*/
		cy.pan({ x: 0, y: 0 });
		cy.zoom(0.5);
		
		
		// Fin consultas SQL
		}})
                .catch(function (error) {
                    console.log(error);
                });
				}})
                .catch(function (error) {
                    console.log(error);
                });
				}})
                .catch(function (error) {
                    console.log(error);
                });
	
}
				
$( document ).ready(function() {
	
	// CCAAs
	
	SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(localidad) FROM foundations_v1"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						console.log(response);
						$.each(response.data.rows, function (i, item) {
							console.log(item.localidad);
    $('#comSelector').append($('<option>', { 
        value: item.localidad,
        text : item.localidad 
    }));
});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

	
		
		$( "#comSelector" )
  .change(function () {
    var str = "";
    $( "#comSelector option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    console.log( str );
	updateNetwork("('" + str.trim() + "')");
  })
  .change();
  
  $('#comSelector').width(150);

  /*
	elementsArray = [];
	
	SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(nombre) FROM founders_v1 WHERE nombre IN (SELECT nombre FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad = 'Logroño'))"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Founders names
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							elementsArray.push({ data: { id: response.data.rows[i].nombre, nodeShape: 'circle' } });
						}
				SQL_CLIENT.request({
                    params: {
                        q: "SELECT DISTINCT(nombre_fundacion) FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad = 'Logroño')"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Foundations names
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion, nodeShape: 'triangle' }, classes: 'fundacion' });
						}
						SQL_CLIENT.request({
                    params: {
                        q: "SELECT nombre,nombre_fundacion FROM founders_v1 WHERE nombre_fundacion IN (SELECT nombre FROM foundations_v1 WHERE localidad = 'Logroño')"
                    },
                })
                .then(function (response) {
                    if (response && response.data) {
						// Edges
						console.log(response.data);		
						for(var i = 0; i < response.data.rows.length; i++) {
							//console.log(response.data.rows[i]);
							//elementsArray.push({ data: { id: response.data.rows[i].nombre_fundacion } });
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
						
												// Print the network
						console.log('Printing network');
						console.log(elementsArray.length);
	
        var cy = cytoscape({
          container: document.getElementById('cy'),
          elements: elementsArray,
          style: 
			cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 50,
        'width': 50,
        'shape': 'data([nodeShape])',
		label: 'data(id)',
        'border-color': '#000',
		'background-color': '#E8747C',
        'border-width': 3,
        'border-opacity': 0.5
      })
	  
    .selector('.fundacion')
      .css({
        'border-color': 'red',
		'background-color': '#74CBE8',
		shape: 'circle'
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
                    name: 'cola',

                    nodeSpacing: 12,
        edgeLengthVal: 25,
        animate: true,
        randomize: true,
		fit: true,
		boundingBox: { // to give cola more space to resolve initial overlaps
          x1: 0,
          y1: 0,
          x2: 100,
          y2: 100
        }
                }
        });
		
		/*cy.reset();
		var pos = cy.nodes("#ARTE Y TECNOLOGÍA").position();
cy.zoom({
  level: 1.5,
  position: pos
});*//*
		cy.pan({ x: 0, y: 0 });
		
		
		// Fin consultas SQL
		}})
                .catch(function (error) {
                    console.log(error);
                });
				}})
                .catch(function (error) {
                    console.log(error);
                });
				}})
                .catch(function (error) {
                    console.log(error);
                });*/
});