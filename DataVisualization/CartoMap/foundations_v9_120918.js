 let selectedComArray = "\'Comunidad de Madrid\', \'Extremadura\', \'País Vasco\', \'Aragón\', \'Comunidad Valenciana\', \'Castilla-La Mancha\', \'Galicia\', \'Cataluña\', \'Canarias\', \'Asturias\', \'Andalucía\', \'Islas Baleares\', \'Cantabria\', \'Castilla y León\', \'Melilla\', \'Región de Murcia\', \'Ceuta\', \'Navarra\', \'La Rioja\'"
 let selectedCatArray = "\'Cultura\', \'Deporte\', \'Educacion\', \'Investigacion\', \'Medio ambiente\', \'Sanidad\', \'Sociedad\', \'Sin Clasificar\'"
 let selectedExtinguidasValue = "'%%'"
 let selectedFuenteArray = "\'EuskadiOpenData\', \'RegCentral\', \'GeneralitatCatalunya\'"
 var perCAplot;
 var perAmbPlot;
 var perDensityCAplot;
 var perNumberOfFoundersPlot;
 var perGenderOfFoundersPlot;
 var altasBajasPlot;
 var perInsChart;
 var fundacionesActivasPlotBoolean = true;
 var altasBajasAnioMaximo = 0;
 var altasBajasAnioMinimo = 0;
 var altasBajasPlotAnioMinimo = 2007;
 var altasBajasPlotAnioMaximo = 2017;
 var map;
 let selectedFoundationValue = "'%%'"

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

 function componentToHex(c) {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
 }

 function getColorsArray(size) {
     var rainbow = [
         "#fbb735", "#e98931", "#eb403b", "#b32E37", "#6c2a6a",
         "#5c4399", "#274389", "#1f5ea8", "#227FB0", "#2ab0c5",
         "#39c0b3", '#b3cae5', '#dbdde4', '#e4e3e4', '#f7ddbb', '#efcab2',
         '#bccacc', '#c7d8d6', '#d9ebe0', '#ebf9e3', '#f4f8d0',
         '#5e7fb1', '#dce8f7', '#eff1f4', '#fce1a8', '#f7ec86',
         '#8fb8ee', '#cbe2f4', '#dbe5eb', '#f9d3b8', '#e0b2a3',
         '#a2e0f9', '#cef5fc', '#eafaeb', '#fefcd3', '#fdf4ba',
         '#6bafd2', '#a4c8dc', '#d6cbca', '#eabc96', '#db8876',
         '#b4ced8', '#d7e5d4', '#e2e8c9', '#f1e5b9', '#edd7ac',
         '#29153e', '#657489', '#bfb6aa', '#ead79d', '#f2ebda',
         '#20202f', '#273550', '#416081', '#adacb2', '#eac3a2',
         '#555351', '#555351', '#8d7b6c', '#cc9d7a', '#fff9aa',
         '#171c33', '#525f83', '#848896', '#bb9d78', '#f6e183',
         '#ffe3c8', '#efad9e', '#c79797', '#a78a92', '#857d8d',
         '#6f749e', '#9a8daf', '#d0a8b9', '#f8bbb1', '#fde6b1',
         '#536a97', '#8087ad', '#bca391', '#bd968a', '#a38b8a',
         '#325176', '#7b9ea7', '#9baf93', '#dbaf81', '#fbdf73',
         '#727288', '#8e889b', '#d3c2bd', '#f9d89a', '#f8c785',
         '#506e90', '#7695aa', '#a7bdb8', '#e2e2b8', '#fdf998',
         '#634b5f', '#868080', '#b7b29b', '#dfd6a4', '#e9f3a2',
         '#7e74b2', '#b3a2c2', '#e2cdbe', '#f6cf97', '#f4a77a',
         '#34a4ca', '#59d7dd', '#a8f2f0', '#d0f8ef', '#d6f6e1',
         '#7696cd', '#8fb2e4', '#b0cff0', '#d7e5ec', '#dee0e7',
         '#8dd6c3', '#c5e5e2', '#eafaeb', '#f9f7ca', '#fceea1',
         '#4e72c7', '#6d9ed7', '#a4c8d5', '#b4d9e1', '#c4d9d6',
         '#47565f', '#5b625a', '#947461', '#f98056', '#f7ec86',
         '#95b3bf', '#c6cdd3', '#e5d8d9', '#f1e1d9', '#f3e1cd',
         '#4c86ab', '#95a5bc', '#bfcdc9', '#dcd6c9', '#edd9c7',
         '#0f124a', '#1b2360', '#515b80', '#758391', '#e5e3b0',
         '#889db6', '#a5b8ce', '#c1cfdd', '#dee1e4', '#d5d1cf',
         '#74bddb', '#a8d1eb', '#cddbf5', '#e4e6fb', '#f6f4f8',
         '#a7d3cb', '#bcc1c4', '#e5cab3', '#fee6c5', '#fdecd0',
         '#325571', '#8e9fa4', '#decab2', '#f2d580', '#ffa642',
         '#c5d4d7', '#d6b98d', '#c99262', '#8c5962', '#43577e'
     ];

     return rainbow.slice(0, size);
 }

 function hidePlots() {
     $('#fundacionesPorCCAATitulo').hide();
     $('#perCAplot').hide();
     $('#perAmbPlot').hide();
     $('#perDensityCAplotTitulo').hide();
     $('#perDensityCAplot').hide();
     $('#perNumberOfFoundersTitulo').hide();
     $('#perNumberOfFoundersPlot').hide();
     $('#perGenderOfFoundersTitulo').hide();
     $('#perGenderOfFoundersPlot').hide();
     $('#altasBajasTitulo').hide();
     $('#altasBajasPlot').hide();
     $('#histogram').hide();
     $('#histogram2').hide();
     $('#histogram3').hide();
     $('#histogram4').hide();
     $('#histogram5').hide();
     $('#histogram6').hide();
     //$('#perDensityCAplot').remove(); // this is my <canvas> element
     //$('#perDensityCAplot').remove(); // this is my <canvas> element
     map.closePopup();
 }

 function getComColor(com) {
     switch (com.trim()) {
         case "Comunidad de Madrid":
             return '#FE2712';
         case "Extremadura":
             return '#FC600A';
         case "País Vasco":
             return '#FB9902';
         case "Aragón":
             return '#FCCC1A';
         case "Comunidad Valenciana":
             return '#FEFE33';
         case "Castilla-La Mancha":
             return '#B2D732';
         case "Galicia":
             return '#66B032';
         case "Cataluña":
             return '#8601AF';
         case "Canarias":
             return '#C21460';
         case "Asturias":
             return '#6C4F3D';
         case "Andalucía":
             return '#672E3B';
         case "Islas Baleares":
             return '#9C9A40';
         case "Cantabria":
             return '#F6D155';
         case "Castilla y León":
             return '#274389';
         case "Melilla":
             return '#1f5ea8';
         case "Región de Murcia":
             return '#227FB0';
         case "Ceuta":
             return '#2ab0c5';
         case "Navarra":
             return '#39c0b3';
         case "La Rioja":
             return '#dbdde4';
         default:
             return '#000000';
     }
 }

 function updateFundadoresGeneroPlotPerIns(nombreFundacion) {
     // Fundadores según su género
     SQL_CLIENT.request({
             params: {
                 q: "SELECT A.gender,COUNT(*) FROM founders_entities_v3 A JOIN founders_v1 B ON A.nombre = B.nombre WHERE B.nombre_fundacion IN ('" + nombreFundacion + "') GROUP BY A.gender ORDER BY A.gender"
             },
         })
         .then(function(response) {
             dataPacks = [];
             labelsArray = [];
             var sumaPersonas = 0;
             for (var z = 0; z < response.data.rows.length; z++) {
                 if (response.data.rows[z]['gender'] == "Hombre" || response.data.rows[z]['gender'] == "Mujer") {
                     sumaPersonas += response.data.rows[z]['count'];
                 } else if (response.data.rows[z]['gender'] == "Entidad") {
                     labelsArray.push("Personas");
                     dataPacks.push(sumaPersonas);

                     labelsArray.push("Entidad");
                     dataPacks.push(response.data.rows[z]['count']);
                     //break;
                 }

                 if (z == response.data.rows.length - 1) {
                     labelsArray.push("Personas");
                     dataPacks.push(sumaPersonas);
                 }
             }



             datapackColors = getColorsArray(3);


             data = {
                 datasets: [{
                     data: dataPacks,
                     backgroundColor: datapackColors
                 }],

                 // These labels appear in the legend and in the tooltips when hovering different arcs
                 labels: labelsArray
             };
             $('#fundadores-genero').remove(); // this is my <canvas> element
             $('#popup-fundacion').append('<canvas id="fundadores-genero" width="150" height="100"><canvas>');
             var bar_ctx = document.getElementById('fundadores-genero');
             perInsChart = new Chart(bar_ctx, {
                 type: 'pie',
                 data: data,
                 options: {
                     title: {
                         display: true,
                         text: 'Cantidad de fundadores según su tipología'
                     },
                     legend: {
                         display: false
                     },
                     'onClick': function(evt, item) {
                         var clickedItemValue = perInsChart.data.labels[item[0]._index];
                         if (clickedItemValue == "Personas") {
                             updatePerTipoPlotPersonasPerIns(perInsChart.data.labels[item[0]._index], nombreFundacion);
                         }
                     }
                 },
                 borderWidth: 1
             });




         })
         .catch(function(error) {
             console.log(error);
         });
 }

 function updateFundadoresGeneroPlot(toHide = true) {
     var fundadoresHombres = 0;
     var fundadoresMujer = 0;
     // Fundadores según su género
     SQL_CLIENT.request({
             params: {
                 q: "SELECT COUNT(DISTINCT(A.nombre)) FROM founders_entities_v3 A JOIN founders_v1 C ON C.nombre = A.nombre JOIN foundations_v1 B ON C.nombre_fundacion = B.nombre AND B.ccaa IN (" + selectedComArray + ") AND B.actividad_principal IN (" + selectedCatArray + ") AND B.fuente = 'RegCentral' AND B.fecha_extincion LIKE " + selectedExtinguidasValue + " WHERE A.gender IN ('Hombre','Mujer')"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log(response);
                 fundadoresHombres = response.data.rows[0]['count'];
                 SQL_CLIENT.request({
                         params: {
                             q: "SELECT COUNT(DISTINCT(A.nombre)) FROM founders_entities_v3 A JOIN founders_v1 C ON C.nombre = A.nombre JOIN foundations_regcen_euskadi_v1 B ON C.nombre_fundacion = B.nombre AND B.ccaa IN (" + selectedComArray + ") AND B.fuente = 'RegCentral' AND B.actividad_principal IN (" + selectedCatArray + ") AND B.fecha_extincion LIKE " + selectedExtinguidasValue + " WHERE A.gender IN ('Entidad') AND B.fuente IN (" + selectedFuenteArray + ") GROUP BY A.gender"
                         },
                     })
                     .then(function(response) {
                         //console.log(response)
                         fundadoresMujer = response.data.rows[0]['count'];
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];

                         dataArray.push(fundadoresHombres);
                         labelsArray.push('Personas');
                         colorsArray.push('#0061ff');

                         dataArray.push(fundadoresMujer);
                         labelsArray.push('Entidad');
                         colorsArray.push('#00f2ff');


                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram4").css('z-index', 2);
                         $("#perGenderOfFoundersPlot").css('z-index', 3);
                         if (perDensityCAplot) {
                             /*articlesPerJournalChart.labels = labelsArray;
                             console.log(articlesPerJournalChart);
                             articlesPerJournalChart.data.labels = labelsArray;
                             articlesPerJournalChart.data.datasets = dataArray;
                             articlesPerJournalChart.update();*/
                             //console.log('update 1');
                             $('#perGenderOfFoundersPlot').remove(); // this is my <canvas> element
                             $('#histogram4').append('<canvas id="perGenderOfFoundersPlot" width="70%" height="60%"><canvas>');
                             var ctx = $("#perGenderOfFoundersPlot");
                             perGenderOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                     'onClick': function(evt, item) {
                                         var clickedItemValue = perGenderOfFoundersPlot.data.labels[item[0]._index];
                                         if (clickedItemValue == "Personas") {
                                             updatePerTipoPlotPersonas(perGenderOfFoundersPlot.data.labels[item[0]._index]);
                                         }
                                     }
                                 },
                                 borderWidth: 1
                             });
                         } else {
                             var ctx = $("#perGenderOfFoundersPlot");
                             perGenderOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         }


                     })
                     .catch(function(error) {
                         console.log(error);
                     });
             }
         })
         .catch(function(error) {
             console.log(error);
         });

     if (toHide) {
         hidePlots();
     }
 }

 function updateFundacionesCantFundadoresPlot() {
     var unSoloFundador = 0;
     // Fundaciones segun cantidad de fundadores
     SQL_CLIENT.request({
             params: {
                 q: "SELECT A.nombre_fundacion FROM founders_v1 A JOIN foundations_regcen_euskadi_v1 B ON A.nombre_fundacion = B.nombre AND B.ccaa IN (" + selectedComArray + ") GROUP BY A.nombre_fundacion HAVING COUNT(DISTINCT(A.nombre)) < 2"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log(response);
                 unSoloFundador = response.data.rows.length;
                 SQL_CLIENT.request({
                         params: {
                             q: "SELECT A.nombre_fundacion FROM founders_v1 A JOIN foundations_regcen_euskadi_v1 B ON A.nombre_fundacion = B.nombre AND B.ccaa IN (" + selectedComArray + ") GROUP BY A.nombre_fundacion HAVING COUNT(DISTINCT(A.nombre)) > 0"
                         },
                     })
                     .then(function(response) {
                         //console.log(response);
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];

                         dataArray.push(unSoloFundador);
                         labelsArray.push('Con 1 fundador');
                         colorsArray.push('#0061ff');

                         dataArray.push(response.data.rows.length - unSoloFundador);
                         labelsArray.push('Con más de 1 fundador');
                         colorsArray.push('#00f2ff');


                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram3").css('z-index', 2);
                         $("#perNumberOfFoundersPlot").css('z-index', 3);
                         if (perDensityCAplot) {
                             /*articlesPerJournalChart.labels = labelsArray;
                             console.log(articlesPerJournalChart);
                             articlesPerJournalChart.data.labels = labelsArray;
                             articlesPerJournalChart.data.datasets = dataArray;
                             articlesPerJournalChart.update();*/
                             //console.log('update 1');
                             $('#perNumberOfFoundersPlot').remove(); // this is my <canvas> element
                             $('#histogram3').append('<canvas id="perNumberOfFoundersPlot" width="70%" height="60%"><canvas>');
                             var ctx = $("#perNumberOfFoundersPlot");
                             perNumberOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         } else {
                             var ctx = $("#perNumberOfFoundersPlot");
                             perNumberOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         }


                     })
                     .catch(function(error) {
                         console.log(error);
                     });
             }
         })
         .catch(function(error) {
             console.log(error);
         });

     hidePlots();
 }

 function updateDensityPerCAPlot() {
     // Fundaciones por densidad cada 10000 habitantes
     SQL_CLIENT.request({
             params: {
                 q: "SELECT nombre,ratio_densidad_10000 FROM comautonomas_v1 WHERE nombre IN (" + selectedComArray + ")"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log(response);
                 dataArray = [];
                 labelsArray = [];
                 var colorsArray = [];
                 for (var i = 0; i < response.data.rows.length; i++) {
                     dataArray.push(response.data.rows[i]['ratio_densidad_10000']);
                     labelsArray.push(response.data.rows[i]['nombre']);
                     colorsArray.push(getComColor(response.data.rows[i]['nombre']));
                 }
                 options = {};
                 data = {
                     datasets: [{
                         data: dataArray,
                         backgroundColor: colorsArray,
                         hoverBackgroundColor: colorsArray
                     }],

                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };
                 $("#map").css('z-index', 1);
                 $("#histogram2").css('z-index', 2);
                 $("#perDensityCAplot").css('z-index', 3);
                 if (perDensityCAplot) {
                     /*articlesPerJournalChart.labels = labelsArray;
                     console.log(articlesPerJournalChart);
                     articlesPerJournalChart.data.labels = labelsArray;
                     articlesPerJournalChart.data.datasets = dataArray;
                     articlesPerJournalChart.update();*/
                     //console.log('update 1');
                     $('#perDensityCAplot').remove(); // this is my <canvas> element
                     $('#histogram2').append('<canvas id="perDensityCAplot" width="70%" height="60%"><canvas>');
                     var ctx = $("#perDensityCAplot");
                     perDensityCAplot = new Chart(ctx, {
                         type: 'doughnut',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },
                         },
                         borderWidth: 1
                     });
                 } else {
                     var ctx = $("#perDensityCAplot");
                     perDensityCAplot = new Chart(ctx, {
                         type: 'doughnut',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },
                         },
                         borderWidth: 1
                     });
                 }


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     hidePlots();
 }

 function updateFoundationsPerCCAAPlot(toHide = true) {
     // Fundaciones por CCAA
     SQL_CLIENT.request({
             params: {
                 q: "SELECT ccaa,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND ccaa IN (" + selectedComArray + ") AND actividad_principal IN (" + selectedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fuente IN (" + selectedFuenteArray + ") GROUP BY ccaa"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log(response);
                 dataArray = [];
                 labelsArray = [];
                 var colorsArray = [];
                 for (var i = 0; i < response.data.rows.length; i++) {
                     dataArray.push(response.data.rows[i]['count']);
                     labelsArray.push(response.data.rows[i]['ccaa']);
                     colorsArray.push(getComColor(response.data.rows[i]['ccaa']));
                 }
                 options = {
                     onClick: fundacionsPorCAClickEvent
                 };
                 data = {
                     datasets: [{
                         data: dataArray,
                         backgroundColor: colorsArray,
                         hoverBackgroundColor: colorsArray
                     }],

                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };
                 $("#map").css('z-index', 1);
                 $("#histogram").css('z-index', 2);
                 $("#perCAplot").css('z-index', 3);
                 if (perCAplot) {
                     /*articlesPerJournalChart.labels = labelsArray;
                     console.log(articlesPerJournalChart);
                     articlesPerJournalChart.data.labels = labelsArray;
                     articlesPerJournalChart.data.datasets = dataArray;
                     articlesPerJournalChart.update();*/
                     //console.log('update 1');
                     $('#perCAplot').remove(); // this is my <canvas> element
                     $('#histogram').append('<canvas id="perCAplot" width="70%" height="60%"><canvas>');
                     var ctx = $("#perCAplot");
                     perCAplot = new Chart(ctx, {
                         type: 'doughnut',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },
                             'onClick': function(evt, item) {
                                 updatePerCAPlotProvincias(perCAplot.data.labels[item[0]._index]);
                             }
                         },
                         borderWidth: 1
                     });
                     $("#histogram").css('z-index', 5);
                     $("#perCAplot").css('z-index', 5);
                 } else {
                     var ctx = $("#perCAplot");
                     perCAplot = new Chart(ctx, {
                         type: 'pie',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },
                             'onClick': function(evt, item) {
                                 updatePerCAPlotProvincias(perCAplot.data.labels[item[0]._index]);
                             }
                         },
                         borderWidth: 1
                     });
                     $("#histogram").css('z-index', 5);
                     $("#perCAplot").css('z-index', 5);
                 }


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     if (toHide) {
         hidePlots();
     }
 }

 function updateAltasBajasPlot(toHide = true) {
     // Fundaciones altas y bajas
     var anios = []
     var dataPacks = []
     var perYearAltasRegCentral = [];
     var perYearAltasEuskadiOpenData = [];
     var perYearBajas = [];
     var datapackObjectActivasRegCentral;
     var datapackObjectActivasEuskadiOpenData;
     var perYearTotalesRegCentral = [];
     var perYearTotalesEuskadiOpenData = [];
     var colorsArray = getColorsArray(3);
     var numberWithCommas = function(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     };

     var formattedCatArray = selectedCatArray.replace("Educación", "Educacion").replace("Investigación", "Investigacion");
     SQL_CLIENT.request({
             params: {
                 q: "SELECT distinct(anio_inscripcion) FROM foundations_regcen_euskadi_v1 WHERE ccaa IN (" + selectedComArray + ") AND actividad_principal IN (" + formattedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fuente IN (" + selectedFuenteArray + ") AND anio_inscripcion > 100 order by anio_inscripcion"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log("Ojo Aqui");
                 //console.log(response);
                 for (var i = 0; i < response.data.rows.length; i++) {
                     anios.push(response.data.rows[i]['anio_inscripcion']);
                 }

                 // Add not existant years
                 for (var i = 0; i < anios.length - 1; i++) {
                     if (parseInt(anios[i]) != parseInt(anios[i + 1]) - 1) {
                         anios.splice(i + 1, 0, parseInt(anios[i]) + 1);
                     }
                 }

                 // Get max and min year
                 altasBajasAnioMaximo = Math.max.apply(Math, anios);
                 altasBajasAnioMinimo = Math.min.apply(Math, anios);

                 perYearAltasRegCentral = new Array(anios.length).fill(0);
                 perYearAltasEuskadiOpenData = new Array(anios.length).fill(0);
                 perYearTotalesRegCentral = new Array(anios.length).fill(0);
                 perYearTotalesEuskadiOpenData = new Array(anios.length).fill(0);

                 SQL_CLIENT.request({
                         params: {
                             q: "SELECT anio_inscripcion,fuente,count(*) FROM foundations_regcen_euskadi_v1 WHERE ccaa IN (" + selectedComArray + ") AND actividad_principal IN (" + formattedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fuente IN (" + selectedFuenteArray + ") GROUP BY anio_inscripcion,fuente order by anio_inscripcion"
                         },
                     })
                     .then(function(response) {
                         if (response && response.data) {
                             //console.log(response);
                             //console.log(response);

                             // RegCentral
                             for (var l = 0; l < response.data.rows.length; l++) {
                                 if (response.data.rows[l]['fuente'] != "RegCentral") continue;
                                 perYearAltasRegCentral[anios.indexOf(response.data.rows[l]['anio_inscripcion'])] = response.data.rows[l]['count'];
                             }

                             // Euskadi
                             for (var l = 0; l < response.data.rows.length; l++) {
                                 if (response.data.rows[l]['fuente'] != "EuskadiOpenData") continue;
                                 perYearAltasEuskadiOpenData[anios.indexOf(response.data.rows[l]['anio_inscripcion'])] = response.data.rows[l]['count'];
                             }

                             var formattedFuenteArray = selectedFuenteArray;

                             SQL_CLIENT.request({
                                     params: {
                                         q: "SELECT anio_extincion,count(*) FROM foundations_regcen_euskadi_v1 WHERE ccaa IN (" + selectedComArray + ") AND actividad_principal IN (" + formattedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fecha_extincion IS NOT NULL AND fuente IN (" + formattedFuenteArray + ") GROUP BY anio_extincion order by anio_extincion"
                                     },
                                 })
                                 .then(function(response) {
                                     if (response && response.data) {
                                         //console.log(response);
                                         // Create extinciones dictionary
                                         var bajasDict = {};
                                         var yearBajasArray = [];
                                         for (var l = 0; l < response.data.rows.length; l++) {
                                             bajasDict[response.data.rows[l]['anio_extincion']] = parseInt(response.data.rows[l]['count'], 10);
                                             yearBajasArray.push(parseInt(response.data.rows[l]['anio_extincion'], 10));
                                         }

                                         var m = 0; // index for extinguidas
                                         for (var k = 0; k < anios.length; k++) {
                                             if (parseInt(anios[k], 10) < yearBajasArray[m]) {
                                                 perYearBajas.push(0);
                                             } else {
                                                 perYearBajas.push(bajasDict[anios[k]] * (-1));
                                                 m++;
                                             }
                                         }

                                         // Fix undefined
                                         for (var k = 0; k < perYearBajas.length; k++) {
                                             if (isNaN(perYearBajas[k])) {
                                                 perYearBajas[k] = 0;
                                             }
                                         }

                                         // Totales RegCentral
                                         for (var n = 0; n < perYearTotalesRegCentral.length; n++) {
                                             if (n == 0) {
                                                 //perYearTotales[n] = perYearAltas[n] - perYearBajas[n];
                                                 perYearTotalesRegCentral[n] = perYearAltasRegCentral[n] + perYearBajas[n];
                                             } else {
                                                 //perYearTotales[n] = perYearTotales[n - 1] + perYearAltas[n] + perYearBajas[n];
                                                 perYearTotalesRegCentral[n] = perYearTotalesRegCentral[n - 1] + perYearAltasRegCentral[n] + perYearBajas[n];
                                             }
                                         }

                                         // Totales EuskadiOpenData
                                         for (var n = 0; n < perYearTotalesEuskadiOpenData.length; n++) {
                                             if (n == 0) {
                                                 //perYearTotales[n] = perYearAltas[n] - perYearBajas[n];
                                                 perYearTotalesEuskadiOpenData[n] = perYearAltasEuskadiOpenData[n];
                                             } else {
                                                 //perYearTotales[n] = perYearTotales[n - 1] + perYearAltas[n] + perYearBajas[n];
                                                 perYearTotalesEuskadiOpenData[n] = perYearTotalesEuskadiOpenData[n - 1] + perYearAltasEuskadiOpenData[n];
                                             }
                                         }

                                         perYearBajas[perYearBajas.length - 1] = 0;

                                         /*for (var l = 0; l < response.data.rows.length; l++) {
                                             perYearBajas.push(response.data.rows[l]['count'])
                                         }*/


                                         //altasAnio.push(response.data.rows[i]['count']);
                                         datapackObjectActivasRegCentral = {
                                             label: "Activas Registro Central",
                                             data: perYearTotalesRegCentral.slice(anios.indexOf(altasBajasPlotAnioMinimo), anios.indexOf(altasBajasPlotAnioMaximo) + 1),
                                             backgroundColor: "#32ccff",
                                             hoverBackgroundColor: "#32ccff",
                                             hoverBorderWidth: 2,
                                             hoverBorderColor: 'lightgrey'
                                         };

                                         datapackObjectActivasEuskadiOpenData = {
                                             label: "Activas EuskadiOpenData",
                                             data: perYearTotalesEuskadiOpenData.slice(anios.indexOf(altasBajasPlotAnioMinimo), anios.indexOf(altasBajasPlotAnioMaximo) + 1),
                                             backgroundColor: "#6242f4",
                                             hoverBackgroundColor: "#6242f4",
                                             hoverBorderWidth: 2,
                                             hoverBorderColor: 'lightgrey'
                                         };

                                         if (!fundacionesActivasPlotBoolean) {
                                             dataPacks.push({})
                                         } else {
                                             if (selectedFuenteArray.includes("RegCentral")) {
                                                 dataPacks.push(datapackObjectActivasRegCentral);
                                             }
                                             if (selectedFuenteArray.includes("EuskadiOpenData")) {
                                                 dataPacks.push(datapackObjectActivasEuskadiOpenData);
                                             }

                                         }

                                         var datapackObjectAltas = {
                                             label: "Altas",
                                             data: perYearAltasRegCentral.slice(anios.indexOf(altasBajasPlotAnioMinimo), anios.indexOf(altasBajasPlotAnioMaximo) + 1),
                                             backgroundColor: "#42f448",
                                             hoverBackgroundColor: "#42f448",
                                             hoverBorderWidth: 2,
                                             hoverBorderColor: 'lightgrey'
                                         };

                                         if (!fundacionesActivasPlotBoolean) {
                                             dataPacks.push(datapackObjectAltas)
                                         } else {
                                             dataPacks.push({})
                                         }
                                         //dataPacks.push(datapackObject)
                                         //dataPacks.push({})

                                         //altasAnio.push(response.data.rows[i]['count']);
                                         var datapackObjectBajas = {
                                             label: "Bajas",
                                             data: perYearBajas.slice(anios.indexOf(altasBajasPlotAnioMinimo), anios.indexOf(altasBajasPlotAnioMaximo) + 1),
                                             backgroundColor: "#ff215c",
                                             hoverBackgroundColor: "#ff215c",
                                             hoverBorderWidth: 2,
                                             hoverBorderColor: 'lightgrey'
                                         };
                                         //dataPacks.push(datapackObject)
                                         //dataPacks.push({})
                                         if (!fundacionesActivasPlotBoolean) {
                                             dataPacks.push(datapackObjectBajas)
                                         } else {
                                             dataPacks.push({})
                                         }

                                         //dataPacks.push(datapackObject)


                                         //dataArray = altasAnio;
                                         labelsArray = anios.slice(anios.indexOf(altasBajasPlotAnioMinimo), anios.indexOf(altasBajasPlotAnioMaximo) + 1);

                                         options = {};
                                         data = {
                                             datasets: dataPacks,

                                             // These labels appear in the legend and in the tooltips when hovering different arcs
                                             labels: labelsArray
                                         };
                                         //console.log('ajajaja hola 1');
                                         //console.log(data);
                                         $("#map").css('z-index', 1);
                                         $("#histogram6").css('z-index', 2);
                                         $("#altasBajasPlot").css('z-index', 3);
                                         if (altasBajasPlot) {
                                             /*articlesPerJournalChart.labels = labelsArray;
                                             console.log(articlesPerJournalChart);
                                             articlesPerJournalChart.data.labels = labelsArray;
                                             articlesPerJournalChart.data.datasets = dataArray;
                                             articlesPerJournalChart.update();*/
                                             //console.log('update 1');
                                             $('#altasBajasPlot').remove(); // this is my <canvas> element
                                             $('#histogram6').append('<canvas id="altasBajasPlot" width="70%" height="60%"><canvas>');
                                             var ctx = $("#altasBajasPlot");
                                             altasBajasPlot = new Chart(ctx, {
                                                 type: 'bar',
                                                 data: data,
                                                 options: {
                                                     tooltips: {
                                                         mode: 'label',
                                                         position: 'nearest',
                                                         intersection: !1,
                                                         callbacks: {
                                                             label: function(tooltipItem, data) {
                                                                 return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel)
                                                             }
                                                         }
                                                     },
                                                     scales: {
                                                         xAxes: [{

                                                             stacked: !0,
                                                             gridLines: {
                                                                 display: !1
                                                             },
                                                             bounds: 'ticks',
                                                             ticks: {
                                                                 callback: function(value, index, values) {
                                                                     return parseInt(value);
                                                                 },
                                                                 autoSkip: false, // doesn't work
                                                                 stepSize: 10
                                                             }
                                                         }],
                                                         yAxes: [{
                                                             stacked: !0,
                                                             ticks: {
                                                                 beginAtZero: !0,
                                                                 callback: function(value) {
                                                                     if (value % 1 === 0) {
                                                                         return value
                                                                     }
                                                                 }
                                                             },
                                                         }],
                                                     },

                                                     maintainAspectRatio: true,
                                                     legend: {
                                                         display: false
                                                     },

                                                 },
                                                 borderWidth: 1
                                             });

                                             $("#histogram6activasOff").click(function() {
                                                 //$("#histogram6activas").removeClass("btn-default").addClass("btn-primary");
                                                 if (!selectedFuenteArray.includes("RegCentral") || !selectedFuenteArray.includes("EuskadiOpenData")) {
                                                     altasBajasPlot.data.datasets[0] = {};
                                                     altasBajasPlot.data.datasets[2] = datapackObjectAltas;
                                                     altasBajasPlot.data.datasets[3] = datapackObjectBajas;
                                                 } else {
                                                     altasBajasPlot.data.datasets[0] = {};
                                                     altasBajasPlot.data.datasets[1] = {};
                                                     altasBajasPlot.data.datasets[2] = datapackObjectAltas;
                                                     altasBajasPlot.data.datasets[3] = datapackObjectBajas;
                                                 }
                                                 altasBajasPlot.update();
                                                 fundacionesActivasPlotBoolean = false;
                                                 $("#histogram6activasOff").hide();
                                                 $("#histogram6activasOn").show();
                                             });

                                             $("#histogram6activasOn").click(function() {
                                                 //$("#histogram6activas").removeClass("btn-primary").addClass("btn-default");
                                                 if (!selectedFuenteArray.includes("RegCentral") || !selectedFuenteArray.includes("EuskadiOpenData")) {

                                                     if (selectedFuenteArray.includes("RegCentral")) {
                                                         altasBajasPlot.data.datasets[0] = datapackObjectActivasRegCentral;
                                                         altasBajasPlot.data.datasets[1] = {};
                                                         altasBajasPlot.data.datasets[2] = {};
                                                         altasBajasPlot.data.datasets[3] = {};
                                                     }

                                                     if (selectedFuenteArray.includes("EuskadiOpenData")) {
                                                         altasBajasPlot.data.datasets[0] = {};
                                                         altasBajasPlot.data.datasets[1] = datapackObjectActivasEuskadiOpenData;
                                                         altasBajasPlot.data.datasets[2] = {};
                                                         altasBajasPlot.data.datasets[3] = {};
                                                     }

                                                 } else {
                                                     altasBajasPlot.data.datasets[0] = datapackObjectActivasRegCentral;
                                                     altasBajasPlot.data.datasets[1] = datapackObjectActivasEuskadiOpenData;
                                                     altasBajasPlot.data.datasets[2] = {};
                                                     altasBajasPlot.data.datasets[3] = {};
                                                 }

                                                 altasBajasPlot.update();
                                                 fundacionesActivasPlotBoolean = true;
                                                 $("#histogram6activasOn").hide();
                                                 $("#histogram6activasOff").show();
                                             });

                                             $("#histogram6").css('z-index', 5);
                                             $("#altasBajasPlot").css('z-index', 5);
                                         }


                                     }
                                 })
                                 .catch(function(error) {
                                     console.log(error);
                                 });
                         }
                     })
                     .catch(function(error) {
                         console.log(error);
                     });
             }
         })
         .catch(function(error) {
             console.log(error);
         });

     if (toHide) {
         hidePlots();
     }
 }

 function updateFoundationsPerAmbPlot(toHide = true) {
     // Fundaciones por ambito
     var formattedCatArray = selectedCatArray.replace("Educación", "Educacion").replace("Investigación", "Investigacion");
     SQL_CLIENT.request({
             params: {
                 q: "SELECT actividad_principal,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND ccaa IN (" + selectedComArray + ") AND actividad_principal IN (" + formattedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fuente IN (" + selectedFuenteArray + ") GROUP BY actividad_principal"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 console.log(response)
                 dataArray = [];
                 labelsArray = [];
                 var colorsArray = [];
                 for (var i = 0; i < response.data.rows.length; i++) {
                     dataArray.push(response.data.rows[i]['count']);
                     if (response.data.rows[i]['actividad_principal'] == "Educacion") {
                         labelsArray.push("Educación");
                     } else if (response.data.rows[i]['actividad_principal'] == "Investigacion") {
                         labelsArray.push("Investigación");
                     } else {
                         labelsArray.push(response.data.rows[i]['actividad_principal']);
                     }
                     //colorsArray.push(getComColor(response.data.rows[i]['ccaa']));
                 }

                 colorsArray = getColorsArray(labelsArray.length);

                 options = {
                     onClick: fundacionsPorCAClickEvent
                 };
                 data = {
                     datasets: [{
                         data: dataArray,
                         backgroundColor: colorsArray,
                         hoverBackgroundColor: colorsArray
                     }],

                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };
                 $("#map").css('z-index', 1);
                 $("#histogram5").css('z-index', 2);
                 $("#perAmbPlot").css('z-index', 3);
                 if (perAmbPlot) {
                     /*articlesPerJournalChart.labels = labelsArray;
                     console.log(articlesPerJournalChart);
                     articlesPerJournalChart.data.labels = labelsArray;
                     articlesPerJournalChart.data.datasets = dataArray;
                     articlesPerJournalChart.update();*/
                     //console.log('update 1');
                     $('#perAmbPlot').remove(); // this is my <canvas> element
                     $('#histogram5').append('<canvas id="perAmbPlot" width="70%" height="60%"><canvas>');
                     var ctx = $("#perAmbPlot");
                     perAmbPlot = new Chart(ctx, {
                         type: 'doughnut',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },

                         },
                         borderWidth: 1
                     });
                     $("#histogram5").css('z-index', 5);
                     $("#perAmbPlot").css('z-index', 5);
                 } else {
                     var ctx = $("#perAmbPlot");
                     perAmbPlot = new Chart(ctx, {
                         type: 'pie',
                         data: data,
                         options: {

                             maintainAspectRatio: true,
                             legend: {
                                 display: false
                             },

                         },
                         borderWidth: 1
                     });
                     $("#histogram5").css('z-index', 5);
                     $("#perAmbPlot").css('z-index', 5);
                 }


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     if (toHide) {
         hidePlots();
     }
 }

 function updatePerTipoPlotPersonas(optSeleccionada) {
     // Fundadores por genero
     SQL_CLIENT.request({
             params: {
                 q: "SELECT gender,COUNT(DISTINCT(A.nombre)) FROM founders_entities_v3 A JOIN founders_v1 C ON C.nombre = A.nombre JOIN foundations_regcen_euskadi_v1 B ON C.nombre_fundacion = B.nombre AND B.ccaa IN (" + selectedComArray + ") AND B.actividad_principal IN (" + selectedCatArray + ") AND B.fecha_extincion LIKE " + selectedExtinguidasValue + " WHERE A.gender IN ('Hombre','Mujer') GROUP BY A.gender"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 dataArray = [];
                 labelsArray = [];
                 var colorsArray = [];
                 for (var i = 0; i < response.data.rows.length; i++) {
                     dataArray.push(response.data.rows[i]['count']);
                     labelsArray.push(response.data.rows[i]['gender']);
                 }
                 colorsArray.push(getColorsArray(3));
                 options = {
                     onClick: fundadoresPorGeneroClickEvent
                 };
                 data = {
                     datasets: [{
                         data: dataArray,
                         backgroundColor: getColorsArray(labelsArray.length),
                         hoverBackgroundColor: getColorsArray(labelsArray.length)
                     }],

                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };
                 $("#map").css('z-index', 1);
                 $("#histogram4").css('z-index', 2);
                 $("#perGenderOfFoundersPlot").css('z-index', 3);

                 /*articlesPerJournalChart.labels = labelsArray;
                 console.log(articlesPerJournalChart);
                 articlesPerJournalChart.data.labels = labelsArray;
                 articlesPerJournalChart.data.datasets = dataArray;
                 articlesPerJournalChart.update();*/
                 //console.log('update 1');
                 $('#perGenderOfFoundersPlot').remove(); // this is my <canvas> element
                 $('#histogram4').append('<canvas id="perGenderOfFoundersPlot" width="70%" height="60%"><canvas>');
                 var ctx = $("#perGenderOfFoundersPlot");
                 perGenderOfFoundersPlot = new Chart(ctx, {
                     type: 'doughnut',
                     data: data,
                     options: {

                         maintainAspectRatio: true,
                         legend: {
                             display: false
                         },
                         'onClick': function(evt, item) {
                             updateFundadoresGeneroPlot(false);
                         }
                     },
                     borderWidth: 1
                 });


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     //hidePlots();
 }

 function updatePerTipoPlotPersonasPerIns(optSeleccionada, nombreFundacion) {
     // Fundadores por genero
     SQL_CLIENT.request({
             params: {
                 q: "SELECT A.gender,COUNT(*) FROM founders_entities_v3 A JOIN founders_v1 B ON A.nombre = B.nombre WHERE B.nombre_fundacion IN ('" + nombreFundacion + "') AND A.gender IN ('Hombre', 'Mujer') GROUP BY A.gender ORDER BY A.gender"
             },
         })
         .then(function(response) {
             if (response && response.data) {

                 console.log(response.data);

                 dataArray = [];
                 dataPacks = [];
                 labelsArray = [];
                 for (var z = 0; z < response.data.rows.length; z++) {
                     labelsArray.push(response.data.rows[z]['gender']);
                     dataPacks.push(response.data.rows[z]['count']);

                 }

                 datapackColors = getColorsArray(3);
                 data = {
                     datasets: [{
                         data: dataPacks,
                         backgroundColor: datapackColors
                     }],

                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };

                 /*$("#map").css('z-index', 1);
                 $("#histogram4").css('z-index', 2);
                 $("#perGenderOfFoundersPlot").css('z-index', 3);*/

                 /*articlesPerJournalChart.labels = labelsArray;
                 console.log(articlesPerJournalChart);
                 articlesPerJournalChart.data.labels = labelsArray;
                 articlesPerJournalChart.data.datasets = dataArray;
                 articlesPerJournalChart.update();*/
                 //console.log('update 1');
                 var theParentId = $('#fundadores-genero').parent();
                 $('#fundadores-genero').remove(); // this is my <canvas> element
                 $('#popup-fundacion').append('<canvas id="fundadores-genero" width="150" height="100"><canvas>');
                 var ctx = $("#fundadores-genero");
                 perInsChart = new Chart(ctx, {
                     type: 'pie',
                     data: data,
                     options: {

                         maintainAspectRatio: true,
                         legend: {
                             display: false
                         },
                         title: {
                             display: true,
                             text: 'Cantidad de fundadores según su tipología'
                         },
                         'onClick': function(evt, item) {
                             updateFundadoresGeneroPlotPerIns(nombreFundacion);
                         }
                     },
                     borderWidth: 1
                 });


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     //hidePlots();
 }

 function updatePerCAPlotProvincias(ccaaSeleccionada) {
     // Fundaciones por provincia en la CCAA elejida
     SQL_CLIENT.request({
             params: {
                 q: "SELECT provincia,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND ccaa = '" + ccaaSeleccionada + "' AND actividad_principal IN (" + selectedCatArray + ") AND fecha_extincion LIKE " + selectedExtinguidasValue + " AND fuente IN (" + selectedFuenteArray + ") GROUP BY provincia"
             },
         })
         .then(function(response) {
             if (response && response.data) {
                 //console.log('response');
                 //console.log(response);
                 dataArray = [];
                 labelsArray = [];
                 var colorsArray = [];
                 //var allselelectedArray=["EuskadiOpenData", "RegCentral"];
                 for (var i = 0; i < response.data.rows.length; i++) {
                     /*console.log('selectedFuenteArray');
                         console.log(selectedFuenteArray);
                         console.log('allselelectedArray');
                         console.log(allselelectedArray);
                         console.log('ccaaSeleccionada');
                         console.log(ccaaSeleccionada);*/
                     //if (ccaaSeleccionada == 'País Vasco' )
                     //
                     /*console.log('selectedFuenteArray');
                     console.log(selectedFuenteArray);
                     console.log('allselelectedArray');
                     console.log(allselelectedArray);
                     console.log('ccaaSeleccionada');
                     console.log(ccaaSeleccionada);*/

                     dataArray.push(response.data.rows[i]['count']);
                     labelsArray.push(response.data.rows[i]['provincia']);


                     //console.log('response.data.rows[i][count]');
                     //console.log(response.data.rows[i]['count']);
                     //sconsole.log(i);
                     colorsArray.push(getComColor(response.data.rows[i]['provincia']));
                 }
                 options = {
                     onClick: fundacionsPorCAClickEvent
                 };
                 data = {
                     datasets: [{
                         data: dataArray,
                         backgroundColor: getColorsArray(labelsArray.length),
                         hoverBackgroundColor: getColorsArray(labelsArray.length)
                     }],


                     // These labels appear in the legend and in the tooltips when hovering different arcs
                     labels: labelsArray
                 };
                 console.log('data');
                 console.log(data);
                 $("#map").css('z-index', 1);
                 $("#histogram").css('z-index', 2);
                 $("#perCAplot").css('z-index', 3);

                 /*articlesPerJournalChart.labels = labelsArray;
                 console.log(articlesPerJournalChart);
                 articlesPerJournalChart.data.labels = labelsArray;
                 articlesPerJournalChart.data.datasets = dataArray;
                 articlesPerJournalChart.update();*/
                 //console.log('update 1');
                 $('#perCAplot').remove(); // this is my <canvas> element
                 $('#histogram').append('<canvas id="perCAplot" width="70%" height="60%"><canvas>');
                 var ctx = $("#perCAplot");
                 perCAplot = new Chart(ctx, {
                     type: 'doughnut',
                     data: data,
                     options: {

                         maintainAspectRatio: true,
                         legend: {
                             display: false
                         },
                         'onClick': function(evt, item) {
                             updateFoundationsPerCCAAPlot(false);
                         }
                     },
                     borderWidth: 1
                 });

                 $("#histogram").css('z-index', 5);
                 $("#perCAplot").css('z-index', 5);


             }
         })
         .catch(function(error) {
             console.log(error);
         });

     //hidePlots();
 }

 function fundacionsPorCAClickEvent(event, array) {}

 function fundadoresPorGeneroClickEvent(event, array) {}

 function drawSegmentValues(myPieChart) {
     for (var i = 0; i < myPieChart.segments.length; i++) {
         ctx.fillStyle = "white";
         var textSize = canvas.width / 10;
         ctx.font = textSize + "px Verdana";
         // Get needed variables
         var value = myPieChart.segments[i].value;
         var startAngle = myPieChart.segments[i].startAngle;
         var endAngle = myPieChart.segments[i].endAngle;
         var middleAngle = startAngle + ((endAngle - startAngle) / 2);

         // Compute text location
         var posX = (radius / 2) * Math.cos(middleAngle) + midX;
         var posY = (radius / 2) * Math.sin(middleAngle) + midY;

         // Text offside by middle
         var w_offset = ctx.measureText(value).width / 2;
         var h_offset = textSize / 4;

         ctx.fillText(value, posX - w_offset, posY + h_offset);
     }
 }

 function main() {
     let selectedYearsArray = "";
     let selectedJournalsArray = "";

     // get styles, query, legend & slider
     const style = $("#style").text();
     const query = _.template($('#query').html());
     const slider_container = $('#slider-container');
     const slider = $('#slider-cities');


     // add map variable
     map = L.map('map', {
         zoomControl: false,
         center: [36.41, -5.70],
         zoom: 5,
         minZoom: 5,
         maxZoom: 24
     });

     // add Voyager Basemap
     L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
         maxZoom: 24,
         zIndex: 0
     }).addTo(map);



     // Adding Voyager Labels
     L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
         maxZoom: 24,
         zIndex: 0
     }).addTo(map);

     L.control.zoom({
         position: 'bottomleft'
     }).addTo(map);
     // add client
     const client = new carto.Client({
         apiKey: '9d3d3e19781c35ce76c075e4cfe9d5caa1604ce9',
         username: 'carto-bsc'
     });

     // define layer configuration
     let citiesSource = new carto.source.SQL(query({
             comunidadesAutonomas: selectedComArray,
             actividadesPrincipales: catSelector,
             extincionVariable: selectedExtinguidasValue,
             fuenteVariable: selectedFuenteArray
         })),
         citiesStyle = new carto.style.CartoCSS(style),
         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
         });

     const styleSpain = new carto.style.CartoCSS(`
        #layer {
         polygon-fill: #4286f4;
        line-color: #0060fc;
        }
      `);

     // define layer configuration
     const catSource = new carto.source.SQL("SELECT * FROM foundations_regcen_euskadi_v1"),
         catLayer = new carto.layer.Layer(catSource, styleSpain);


     // add layer to Leaflet map
     client.addLayers([citiesLayer]);
     client.getLeafletLayer().addTo(map)

     $(document).ready(function() {

             $("#moreInfoButton").click(function() {

                 $('#myModalMoreInfo').appendTo("body").modal('show');
             });

             updateAltasBajasPlot();

             $("#histogram6activasOn").hide();

             // Hide everything
             //$('#sidebarButtonClosed').hide();
             $('#leftSidebar').hide();

             hidePlots();

             $("#sidebarButtonOpen").click(function() {
                 $('#sidebarButtonClosed').show();
                 $('#leftSidebar').fadeOut();
             });
             $("#sidebarButtonClosed").click(function() {
                 $('#sidebarButtonClosed').hide();
                 $('#leftSidebar').fadeIn();
             });

             $("#histogramClose").click(function() {
                 updateFoundationsPerCCAAPlot(false);
                 $("#histogram").hide();
             });

             $("#histogramClose2").click(function() {
                 $("#histogram2").hide();
             });

             $("#histogramClose3").click(function() {
                 $("#histogram3").hide();
             });

             $("#histogramClose4").click(function() {
                 $("#histogram4").hide();
             });

             $("#histogramClose5").click(function() {
                 $("#histogram5").hide();
             });

             $("#histogramClose6").click(function() {
                 $("#histogram6").hide();
             });

             // Buscador fundación
             var availableFoundationNames = [];

             SQL_CLIENT.request({
                     params: {
                         q: "SELECT DISTINCT(nombre) FROM foundations_regcen_euskadi_v1 ORDER by nombre ASC"
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         dataArray = [];
                         labelsArray = [];
                         for (var i = 0; i < response.data.rows.length; i++) {

                            availableFoundationNames.push({
                                 label: response.data.rows[i]['nombre'],
                                 value: response.data.rows[i]['nombre']
                             });
                             console.log(response.data.rows[i]['nombre']);
                         }

                         $("#buscarFundacionInput").autocomplete({
                             minLength: 2,
                             source: function(request, response) {
                                 var results = $.ui.autocomplete.filter(availableFoundationNames, request.term);
                                 response(results.slice(0, 15));
                             },
                             updater: function(item) {
                                 return item;
                             },
                             select: function(event, ui) {
                                 event.preventDefault();
                                 $("#buscarFundacionInput").val(ui.item.value);

                                 console.log("Fundacion buscada: " + ui.item.value);

                                 selectedFoundationValue = "'" + ui.item.value + "'";

                             },
                             focus: function(event, ui) {
                                 event.preventDefault();
                                 //$("#buscarFundacionInput").val(ui.item.value);
                             },
                             open: function(event, ui){
                                console.log("hola1");
                                var $input = $(event.target),
                                    $results = $input.autocomplete("widget"),
                                    top = $results.position().top,
                                    height = $results.height(),
                                    inputHeight = $input.height(),
                                    newTop = top - height - inputHeight;
                            
                                console.log("hola2");
                                //$results.css("top", -newTop*4 + "px");
                            }
                         });

                         $("#fundacionBuscarButton").click(function() {
                             if ($("#buscarFundacionInput").val().length > 1) {

                                selectedFoundationValue = "'" + $("#buscarFundacionInput").val().replace(/'/g, "''") + "'";
                                $("#buscarFundacionInput").val("");

                                 SQL_CLIENT.request({
                                         params: {
                                             q: "SELECT coordX,coordY FROM foundations_coords_v1 WHERE nombre = " + selectedFoundationValue + ""
                                         },
                                     })
                                     .then(function(response) {
                                         if (response && response.data) {
                                            if(response.data.rows.length >= 1) {
                                                console.log(response.data);
                                                console.log('T1');
                                                console.log(response.data.rows[0].coordx);
                                                console.log(response.data.rows[0].coordy);
                                                map.setView([response.data.rows[0].coordx,response.data.rows[0].coordy],20);
                                             } else {
                                                $('#alertBox2').fadeIn();
                                                setTimeout(function() {
                                                    $('#alertBox2').fadeOut();
                                                }, 5000);
                                             }
                                        }

                                     })
                                     .catch(function(error) {
                                         //console.log(error);
                                     });




                                 //



                             } else {
                                 $('#alertBox').fadeIn();
                                 setTimeout(function() {
                                     $('#alertBox').fadeOut();
                                 }, 5000);
                             }
                         });

                     }
                 })
                 .catch(function(error) {
                     //console.log(error);
                 });


             //

             $("#mostrarFundacionesPorCCAA").click(function() {
                 //hidePlots();
                 $('#histogram').fadeIn();
                 $('#fundacionesPorCCAATitulo').fadeIn();
                 $('#perCAplot').fadeIn();
                 $("#histogram").css('z-index', 5);
                 $("#perCAplot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram2").css('z-index', 4);
                 $("#perDensityCAplot").css('z-index', 4);
                 $("#histogram3").css('z-index', 4);
                 $("#perNumberOfFoundersPlot").css('z-index', 4);
                 $("#histogram4").css('z-index', 4);
                 $("#perGenderOfFoundersPlot").css('z-index', 4);
                 $("#histogram5").css('z-index', 4);
                 $("#perAmbPlot").css('z-index', 4);
                 $("#histogram6").css('z-index', 4);
                 $("#altasBajasPlot").css('z-index', 4);

             });

             $("#mostrarFundacionesPorAmbito").click(function() {
                 //hidePlots();
                 $('#histogram5').fadeIn();
                 $('#fundacionesPorAmbitoTitulo').fadeIn();
                 $('#perAmbPlot').fadeIn();
                 $("#histogram5").css('z-index', 5);
                 $("#perAmbPlot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram2").css('z-index', 4);
                 $("#perDensityCAplot").css('z-index', 4);
                 $("#histogram3").css('z-index', 4);
                 $("#perNumberOfFoundersPlot").css('z-index', 4);
                 $("#histogram4").css('z-index', 4);
                 $("#perGenderOfFoundersPlot").css('z-index', 4);
                 $("#histogram").css('z-index', 4);
                 $("#perCAplot").css('z-index', 4);
                 $("#histogram6").css('z-index', 4);
                 $("#altasBajasPlot").css('z-index', 4);

             });

             $("#mostrarFundacionesPorDensidadCCAA").click(function() {
                 //hidePlots();
                 $('#histogram2').fadeIn();
                 $('#perDensityCAplotTitulo').fadeIn();
                 $('#perDensityCAplot').fadeIn();
                 $("#histogram2").css('z-index', 5);
                 $("#perDensityCAplot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram").css('z-index', 4);
                 $("#perCAplot").css('z-index', 4);
                 $("#histogram3").css('z-index', 4);
                 $("#perNumberOfFoundersPlot").css('z-index', 4);
                 $("#histogram4").css('z-index', 4);
                 $("#perGenderOfFoundersPlot").css('z-index', 4);
                 $("#histogram5").css('z-index', 4);
                 $("#perAmbPlot").css('z-index', 4);
                 $("#histogram6").css('z-index', 4);
                 $("#altasBajasPlot").css('z-index', 4);

             });

             $("#mostrarFundacionesSegunFundadores").click(function() {
                 //hidePlots();
                 $('#histogram3').fadeIn();
                 $('#perNumberOfFoundersTitulo').fadeIn();
                 $('#perNumberOfFoundersPlot').fadeIn();
                 $("#histogram3").css('z-index', 5);
                 $("#perNumberOfFoundersPlot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram2").css('z-index', 4);
                 $("#perDensityCAplot").css('z-index', 4);
                 $("#histogram").css('z-index', 4);
                 $("#perCAplot").css('z-index', 4);
                 $("#histogram4").css('z-index', 4);
                 $("#perGenderOfFoundersPlot").css('z-index', 4);
                 $("#histogram5").css('z-index', 4);
                 $("#perAmbPlot").css('z-index', 4);
                 $("#histogram6").css('z-index', 4);
                 $("#altasBajasPlot").css('z-index', 4);

             });

             $("#mostrarFundacionesSegunGeneroFundadores").click(function() {
                 //hidePlots();
                 $('#histogram4').fadeIn();
                 $('#perGenderOfFoundersTitulo').fadeIn();
                 $('#perGenderOfFoundersPlot').fadeIn();
                 $("#histogram4").css('z-index', 5);
                 $("#perGenderOfFoundersPlot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram2").css('z-index', 4);
                 $("#perDensityCAplot").css('z-index', 4);
                 $("#histogram").css('z-index', 4);
                 $("#perCAplot").css('z-index', 4);
                 $("#histogram3").css('z-index', 4);
                 $("#perNumberOfFoundersPlot").css('z-index', 4);
                 $("#histogram5").css('z-index', 4);
                 $("#perAmbPlot").css('z-index', 4);
                 $("#histogram6").css('z-index', 4);
                 $("#altasBajasPlot").css('z-index', 4);

             });

             $("#mostrarAltasBajas").click(function() {
                 //hidePlots();
                 $('#histogram6').fadeIn();
                 $('#altasBajasTitulo').fadeIn();
                 $('#altasBajasPlot').fadeIn();
                 $("#histogram6").css('z-index', 5);
                 $("#altasBajasPlot").css('z-index', 5);
                 // Put the rest behind
                 $("#histogram2").css('z-index', 4);
                 $("#perDensityCAplot").css('z-index', 4);
                 $("#histogram").css('z-index', 4);
                 $("#perCAplot").css('z-index', 4);
                 $("#histogram3").css('z-index', 4);
                 $("#perNumberOfFoundersPlot").css('z-index', 4);
                 $("#histogram5").css('z-index', 4);
                 $("#perAmbPlot").css('z-index', 4);
                 $("#histogram4").css('z-index', 4);
                 $("#perGenderOfFoundersPlot").css('z-index', 4);

             });


             $("#histogram6yearleft").click(function() {
                 if (altasBajasPlotAnioMaximo - 11 <= altasBajasAnioMinimo) {
                     if (altasBajasAnioMinimo + 10 != altasBajasPlotAnioMaximo) {
                         altasBajasPlotAnioMaximo = altasBajasAnioMinimo + 10;
                         altasBajasPlotAnioMinimo = altasBajasPlotAnioMaximo - 10;
                         updateAltasBajasPlot(false);
                         //$("#histogram6activasOn").hide();
                         //$("#histogram6activasOff").show();
                     }
                 } else {
                     altasBajasPlotAnioMaximo = altasBajasPlotAnioMaximo - 1;
                     altasBajasPlotAnioMinimo = altasBajasPlotAnioMaximo - 10;
                     updateAltasBajasPlot(false);
                     //$("#histogram6activasOn").hide();
                     //$("#histogram6activasOff").show();
                 }

                 $("#histogram6yeartext").text(altasBajasPlotAnioMinimo + " - " + altasBajasPlotAnioMaximo);
             });

             $("#histogram6yearright").click(function() {
                 if (altasBajasPlotAnioMaximo + 1 >= altasBajasAnioMaximo) {
                     if (altasBajasPlotAnioMaximo != altasBajasAnioMaximo) {
                         altasBajasPlotAnioMaximo = altasBajasAnioMaximo;
                         altasBajasPlotAnioMinimo = altasBajasPlotAnioMaximo - 10;
                         updateAltasBajasPlot(false);
                         //$("#histogram6activasOn").hide();
                         //$("#histogram6activasOff").show();
                     }
                 } else {
                     altasBajasPlotAnioMaximo = altasBajasPlotAnioMaximo + 1;
                     altasBajasPlotAnioMinimo = altasBajasPlotAnioMaximo - 10;
                     updateAltasBajasPlot(false);
                     //$("#histogram6activasOn").hide();
                     //$("#histogram6activasOff").show();
                 }

                 $("#histogram6yeartext").text(altasBajasPlotAnioMinimo + " - " + altasBajasPlotAnioMaximo);
             });


             // Fundaciones segun cantidad de fundadores
             SQL_CLIENT.request({
                     params: {
                         q: "SELECT nombre,ratio_densidad_10000 FROM comautonomas_v1 WHERE nombre IN (" + selectedComArray + ")"
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         //console.log(response);
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];

                         dataArray.push(1940);
                         labelsArray.push('Con 1 fundador');
                         colorsArray.push('#0061ff');

                         dataArray.push(2417);
                         labelsArray.push('Con más de 1 fundador');
                         colorsArray.push('#00f2ff');


                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram3").css('z-index', 2);
                         $("#perNumberOfFoundersPlot").css('z-index', 3);
                         if (perDensityCAplot) {
                             /*articlesPerJournalChart.labels = labelsArray;
                             console.log(articlesPerJournalChart);
                             articlesPerJournalChart.data.labels = labelsArray;
                             articlesPerJournalChart.data.datasets = dataArray;
                             articlesPerJournalChart.update();*/
                             //console.log('update 1');
                             $('#perNumberOfFoundersPlot').remove(); // this is my <canvas> element
                             $('#histogram3').append('<canvas id="perNumberOfFoundersPlot" width="70%" height="50%"><canvas>');
                             var ctx = $("#perNumberOfFoundersPlot");
                             perNumberOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         } else {
                             var ctx = $("#perNumberOfFoundersPlot");
                             perNumberOfFoundersPlot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         }


                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });
             // Fundaciones por CCAA
             SQL_CLIENT.request({
                     params: {
                         q: "SELECT ccaa,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND fuente IN (" + selectedFuenteArray + ") GROUP BY ccaa"
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];
                         for (var i = 0; i < response.data.rows.length; i++) {
                             dataArray.push(response.data.rows[i]['count']);
                             labelsArray.push(response.data.rows[i]['ccaa']);
                             colorsArray.push(getComColor(response.data.rows[i]['ccaa']));
                         }
                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram").css('z-index', 2);
                         $("#perCAplot").css('z-index', 3);
                         var ctx = $("#perCAplot");
                         perCAplot = new Chart(ctx, {
                             type: 'pie',
                             data: data,
                             options: {

                                 maintainAspectRatio: true,
                                 legend: {
                                     display: false
                                 },
                             },
                             borderWidth: 1
                         });
                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });

             // actividad_principal
             SQL_CLIENT.request({
                     params: {
                         q: "SELECT actividad_principal,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND fuente IN (" + selectedFuenteArray + ") GROUP BY actividad_principal" // AND fuente IN (" + selectedFuenteArray + ")
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];
                         for (var i = 0; i < response.data.rows.length; i++) {
                             dataArray.push(response.data.rows[i]['count']);
                             labelsArray.push(response.data.rows[i]['actividad_principal']);
                             //colorsArray.push(getComColor(response.data.rows[i]['actividad_principal']));
                         }
                         colorsArray = getColorsArray(7);
                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram6").css('z-index', 2);
                         $("#altasBajasPlot").css('z-index', 3);
                         var ctx = $("#altasBajasPlot");
                         altasBajasPlot = new Chart(ctx, {
                             type: 'bar',
                             data: data,
                             options: {
                                 scales: {
                                     xAxes: [{
                                         stacked: !0,
                                         gridLines: {
                                             display: !1
                                         },
                                     }],
                                     yAxes: [{
                                         stacked: !0,
                                         ticks: {
                                             beginAtZero: !0,
                                             callback: function(value) {
                                                 if (value % 1 === 0) {
                                                     return value
                                                 }
                                             }
                                         },
                                     }],
                                 },

                                 maintainAspectRatio: true,
                                 legend: {
                                     display: false
                                 },
                             },
                             borderWidth: 1
                         });
                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });

             // Fundaciones por ambito
             SQL_CLIENT.request({
                     params: {
                         q: "SELECT actividad_principal,COUNT(*) FROM foundations_regcen_euskadi_v1 WHERE latitude IS NOT NULL AND fuente IN (" + selectedFuenteArray + ") GROUP BY actividad_principal"
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];
                         for (var i = 0; i < response.data.rows.length; i++) {
                             dataArray.push(response.data.rows[i]['count']);
                             labelsArray.push(response.data.rows[i]['actividad_principal']);
                             //colorsArray.push(getComColor(response.data.rows[i]['actividad_principal']));
                         }
                         colorsArray = getColorsArray(7);
                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram5").css('z-index', 2);
                         $("#perAmbPlot").css('z-index', 3);
                         var ctx = $("#perAmbPlot");
                         perAmbPlot = new Chart(ctx, {
                             type: 'pie',
                             data: data,
                             options: {

                                 maintainAspectRatio: true,
                                 legend: {
                                     display: false
                                 },
                             },
                             borderWidth: 1
                         });
                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });

             // Fundaciones por densidad cada 10000 habitantes
             SQL_CLIENT.request({
                     params: {
                         q: "SELECT nombre,ratio_densidad_10000 FROM comautonomas_v1 WHERE nombre IN (" + selectedComArray + ")"
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         //console.log(response)
                         dataArray = [];
                         labelsArray = [];
                         var colorsArray = [];
                         for (var i = 0; i < response.data.rows.length; i++) {
                             dataArray.push(response.data.rows[i]['ratio_densidad_10000']);
                             labelsArray.push(response.data.rows[i]['nombre']);
                             colorsArray.push(getComColor(response.data.rows[i]['nombre']));
                         }
                         options = {};
                         data = {
                             datasets: [{
                                 data: dataArray,
                                 backgroundColor: colorsArray,
                                 hoverBackgroundColor: colorsArray
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };
                         $("#map").css('z-index', 1);
                         $("#histogram2").css('z-index', 2);
                         $("#perDensityCAplot").css('z-index', 3);
                         if (perDensityCAplot) {
                             /*articlesPerJournalChart.labels = labelsArray;
                             console.log(articlesPerJournalChart);
                             articlesPerJournalChart.data.labels = labelsArray;
                             articlesPerJournalChart.data.datasets = dataArray;
                             articlesPerJournalChart.update();*/
                             //console.log('update 1');
                             $('#perDensityCAplot').remove(); // this is my <canvas> element
                             $('#histogram2').append('<canvas id="perDensityCAplot" width="70%" height="50%"><canvas>');
                             var ctx = $("#perDensityCAplot");
                             perDensityCAplot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         } else {
                             var ctx = $("#perDensityCAplot");
                             perDensityCAplot = new Chart(ctx, {
                                 type: 'doughnut',
                                 data: data,
                                 options: {

                                     maintainAspectRatio: true,
                                     legend: {
                                         display: false
                                     },
                                 },
                                 borderWidth: 1
                             });
                         }


                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });


             // Drag plots window
             //Make the DIV element draggagle:
             dragElement(document.getElementById(("histogram")));
             dragElement(document.getElementById(("histogram2")));
             dragElement(document.getElementById(("histogram3")));
             dragElement(document.getElementById(("histogram4")));
             dragElement(document.getElementById(("histogram5")));
             dragElement(document.getElementById(("histogram6")));

             function dragElement(elmnt) {
                 var pos1 = 0,
                     pos2 = 0,
                     pos3 = 0,
                     pos4 = 0;
                 if (document.getElementById(elmnt.id + "header")) {
                     /* if present, the header is where you move the DIV from:*/
                     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                 } else {
                     /* otherwise, move the DIV from anywhere inside the DIV:*/
                     elmnt.onmousedown = dragMouseDown;
                 }

                 function dragMouseDown(e) {
                     e = e || window.event;
                     // get the mouse cursor position at startup:
                     pos3 = e.clientX;
                     pos4 = e.clientY;
                     document.onmouseup = closeDragElement;
                     // call a function whenever the cursor moves:
                     document.onmousemove = elementDrag;
                 }

                 function elementDrag(e) {
                     e = e || window.event;
                     // calculate the new cursor position:
                     pos1 = pos3 - e.clientX;
                     pos2 = pos4 - e.clientY;
                     pos3 = e.clientX;
                     pos4 = e.clientY;
                     // set the element's new position:
                     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                 }

                 function closeDragElement() {
                     /* stop moving when mouse button is released:*/
                     document.onmouseup = null;
                     document.onmousemove = null;
                 }
             }
             $('#comSelector').multiselect({
                 includeSelectAllOption: true,
                 selectAllText: 'Seleccionar todas',
                 buttonWidth: '200px',
                 allSelectedText: 'Todas las CCAA seleccionadas',
                 onChange: function(option, checked) {

                 },
                 buttonText: function(options) {
                     if (options.length > 0) {
                         var selected = [];
                         options.each(function() {
                             selected.push([$(this).text(), $(this).data('order')]);
                         });

                         selected.sort(function(a, b) {
                             return a[1] - b[1];
                         });

                         var text = '';
                         for (var i = 0; i < selected.length; i++) {
                             text += "'" + selected[i][0] + "'" + ', ';
                         }
                         selectedComArray = text.substr(0, text.length - 2);
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))
                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();

                         hidePlots();
                     }
                     if (options.length === 0) {
                         selectedComArray = "'SinCCAA'";
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))

                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });

                         return '0 CCAA seleccionadas';
                     } else {
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         return options.length + ' CCAA seleccionadas';
                     }
                 }
             }, 'selectAll');

             $('option', $('#comSelector')).each(function(index, element) {
                 $(this).removeAttr('selected').prop('selected', true);
             });
             $("#comSelector").multiselect('refresh');

             // Selector categoria
             $('#catSelector').multiselect({
                 includeSelectAllOption: true,
                 selectAllText: 'Seleccionar todas',
                 buttonWidth: '200px',
                 allSelectedText: 'Todas las categorías seleccionadas',
                 onChange: function(option, checked) {

                 },
                 buttonText: function(options) {
                     if (options.length > 0) {
                         var selected = [];
                         options.each(function() {
                             selected.push([$(this).text(), $(this).data('order')]);
                         });

                         selected.sort(function(a, b) {
                             return a[1] - b[1];
                         });

                         var text = '';
                         for (var i = 0; i < selected.length; i++) {
                             text += "'" + selected[i][0] + "'" + ', ';
                         }
                         selectedCatArray = text.substr(0, text.length - 2);
                         selectedCatArray = selectedCatArray.replace("Educación", "Educacion").replace("Investigación", "Investigacion");
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))
                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         hidePlots();
                     }
                     if (options.length === 0) {
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: "'SinActividadPrincipal'",
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))

                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });

                         return '0 cat. seleccionadas';
                     } else {
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         return options.length + ' cat. seleccionadas';
                     }
                 }
             }, 'selectAll');

             $('option', $('#catSelector')).each(function(index, element) {
                 $(this).removeAttr('selected').prop('selected', true);
             });
             $("#catSelector").multiselect('refresh');

             // Selector extinguidas
             $('#extinguidasSelector').multiselect({
                 includeSelectAllOption: true,
                 selectAllText: 'Seleccionar todas',
                 buttonWidth: '200px',
                 allSelectedText: 'Todas',
                 onChange: function(option, checked) {

                 },
                 buttonText: function(options) {
                     if (options.length > 0) {
                         var selected = [];
                         options.each(function() {
                             selected.push([$(this).text(), $(this).data('order')]);
                         });

                         selected.sort(function(a, b) {
                             return a[1] - b[1];
                         });

                         var text = '';
                         for (var i = 0; i < selected.length; i++) {
                             text += "'" + selected[i][0] + "'" + ', ';
                         }

                         var selectedExtOption = text.substr(0, text.length - 2).split("'")[1];

                         if (selectedExtOption == "No extinguidas") {
                             selectedExtinguidasValue = "'%No%'";
                         }

                         if (selectedExtOption == "Extinguidas") {
                             selectedExtinguidasValue = "'%/%'";
                         }

                         if (selectedExtOption == "Todas") {
                             selectedExtinguidasValue = "'%%'";
                         }

                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))
                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });

                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         hidePlots();
                     }
                     if (options.length === 0) {
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: "'SinActividadPrincipal'",
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))

                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });

                         return '0 cat. seleccionadas';
                     } else {
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();

                         /*if(options[0].outerText == "No extinguidas") {
                            selectedExtinguidasValue = "%No%";
                         }
                    
                         if(options[0].outerText == "Extinguidas") {
                            selectedExtinguidasValue = "%/%";
                         }
                    
                         if(options[0].outerText == "Todas") {
                            selectedExtinguidasValue = "%%";
                         }*/


                         return options[0].outerText;
                     }
                 }
             }, 'selectAll');

             $('option', $('#extinguidasSelector')).each(function(index, element) {
                 $(this).removeAttr('selected').prop('selected', true);
             });
             $("#extinguidasSelector").multiselect('refresh');
             // Selector fuente
             $('#fuenteSelector').multiselect({
                 includeSelectAllOption: true,
                 selectAllText: 'Seleccionar todas',
                 buttonWidth: '200px',
                 allSelectedText: 'Todas las categorías seleccionadas',
                 onChange: function(option, checked) {

                 },
                 buttonText: function(options) {
                     if (options.length > 0) {
                         var selected = [];
                         options.each(function() {
                             selected.push([$(this).val(), $(this).data('order')]);
                         });

                         selected.sort(function(a, b) {
                             return a[1] - b[1];
                         });

                         var text = '';
                         for (var i = 0; i < selected.length; i++) {
                             text += "'" + selected[i][0] + "'" + ', ';
                         }
                         selectedFuenteArray = text.substr(0, text.length - 2);
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: selectedFuenteArray
                         }))
                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         hidePlots();
                     }
                     if (options.length === 0) {
                         citiesSource.setQuery(query({
                             comunidadesAutonomas: selectedComArray,
                             actividadesPrincipales: selectedCatArray,
                             extincionVariable: selectedExtinguidasValue,
                             fuenteVariable: "'sin fuente seleccionada'"
                         }))

                         citiesLayer = new carto.layer.Layer(citiesSource, citiesStyle, {
                             featureOverColumns: ['nombre', 'provincia', 'localidad', 'domicilio', 'actividad_principal', 'codigo_postal', 'fecha_inscripcion', 'fecha_constitucion', 'ccaa', 'idfundacion', 'fuente', 'provincia_nativo', 'actividad_nativo']
                         });

                         return '0 fuente. seleccionadas';
                     } else {
                         updateFoundationsPerCCAAPlot();
                         updateFoundationsPerAmbPlot();
                         updateAltasBajasPlot();
                         updateDensityPerCAPlot();
                         updateFundacionesCantFundadoresPlot();
                         updateFundadoresGeneroPlot();
                         return options.length + ' fuente. seleccionadas';
                     }
                 }
             }, 'selectAll');

             $('option', $('#fuenteSelector')).each(function(index, element) {
                 $(this).removeAttr('selected').prop('selected', true);
             });
             $("#fuenteSelector").multiselect('refresh');
         }

     );

     const popup = L.popup({
         closeButton: true
     });

     function getColorArray(numColors) {
         colorArray = []
         for (var i = 0; i < numColors; i++) {
             var color = '#' + Math.random().toString(16).substr(2, 6);
             colorArray.push(color);
         }
         s
         return colorArray;
     }

     function openInNewTab(url, param) {
         var finalUrl = url + encodeURIComponent(param);
         var win = window.open(finalUrl, '_blank');
         win.focus();
     }

     function openPopup(featureEvent) {
         popup.setLatLng(featureEvent.latLng);
         if (!popup.isOpen()) {
             let content = '';
             content += `<div class="popup-container" id="popup-fundacion">`;
             if (featureEvent.data.nombre) {
                 content += `<h4>${featureEvent.data.nombre}</h4>`;
                 content += `<br><br>`;
                 if (featureEvent.data.fuente == 'EuskadiOpenData') {
                     content += `<p><b>PROVINCIA :</b> ${featureEvent.data.provincia_nativo.toUpperCase()}</p>`;
                 } else {
                     content += `<p><b>PROVINCIA :</b> ${featureEvent.data.provincia.toUpperCase()}</p>`;
                 }
                 content += `<p><b>LOCALIDAD:</b> ${featureEvent.data.localidad.toUpperCase()}</p>`;
                 content += `<p><b>CÓDIGO POSTAL:</b> ${featureEvent.data.codigo_postal}</p>`;
                 content += `<p><b>DOMICILIO:</b> ${featureEvent.data.domicilio.toUpperCase()}</p>`;
                 content += `<p><b>CA:</b> ${featureEvent.data.ccaa.toUpperCase()}</p>`;
                 content += `<p><b>CATEGORÍA:</b> ${featureEvent.data.actividad_principal.toUpperCase()}</p>`;
                 //if (featureEvent.data.fuente != 'EuskadiOpenData') {
                 content += `<p><b>FECHA DE INSCRIPCIÓN:</b> ${featureEvent.data.fecha_inscripcion}</p>`;
                 //}
                 content += `<p><b>FECHA DE CONSTITUCIÓN:</b> ${featureEvent.data.fecha_constitucion}</p>`;
                 if (featureEvent.data.fuente == 'RegCentral') {
                     content += `<center><button type="button" id ="mostrarRedFundacion" data-toggle="tooltip" data-placement="right" title="Mostrar la red de fundadores derivada desde esta fundación" class="btn btn-primary" style="z-index: 10; width: 70%;">Mostrar red fundadores</button></center><br>`;
                     content += `<center><button type="button" id ="mostrarRedPatronosFundacion" data-toggle="tooltip" data-placement="right" title="Mostrar la red de patronos derivada desde esta fundación" class="btn btn-primary" style="z-index: 10; width: 70%;">Mostrar red patronos</button></center><br>`;
                     content += `<center><button type="button" id ="irRegistroFundacion" data-toggle="tooltip" data-placement="right" title="Mostrar la fundación en el registro" class="btn btn-primary" style="z-index: 10; width: 70%;">Ir al registro</button></center><br>`;
                     content += `<canvas id="fundadores-genero" width="150" height="100"></canvas>`;
                 } else if (featureEvent.data.fuente == 'EuskadiOpenData') {
                     content += `<center><button type="button" id ="irRegistroFundacionEuskadi" data-toggle="tooltip" data-placement="right" title="Mostrar la fundación en el registro" class="btn btn-primary" style="z-index: 10; width: 70%;">Ir al registro</button></center><br>`;
                 } else if (featureEvent.data.fuente == 'GeneralitatCatalunya') {
                     content += `<p><b>ACTIVIDAD (Clasificación Generalitat):</b> ${featureEvent.data.actividad_nativo}</p>`;
                     //content += `<center><button type="button" id ="irRegistroFundacionEuskadi" data-toggle="tooltip" data-placement="right" title="Mostrar la fundación en el registro" class="btn btn-primary" style="z-index: 10; width: 70%;">Ir al registro</button></center><br>`;
                 }
             }
             content += `</div>`;
             popup.setContent(content);
             popup.openOn(map);

             // Boton red
             $("#mostrarRedFundacion").click(function() {
                 openInNewTab("./network_viewer/index.html?fundacion=", featureEvent.data.nombre);

             });
             //

             // Boton red patronos
             $("#mostrarRedPatronosFundacion").click(function() {
                 openInNewTab("./patrons_network/index.html?fundacion=", featureEvent.data.nombre);

             });
             //

             $("#irRegistroFundacion").click(function() {
                 openInNewTab("http://fundosbuscador.mjusticia.gob.es/fundosbuscador/DetalleFundacion.action?idFundacion=", featureEvent.data.idfundacion);

             });
             $("#irRegistroFundacionEuskadi").click(function() {
                 //openInNewTab("http://opendata.euskadi.eus/catalogo/contenidos/fundacion/" + featureEvent.data.num_registro + "/es_def/index.shtml" );
                 var nombref = featureEvent.data.nombre
                 nombref = nombref.replace(' - ', '-').replace(' -', '-').replace('- ', '-').replace('/ ', '').replace(' /', '').replace('/', '').replace('FUNDAZIOA.', 'fundazioa').replace('. ', '-').replace('. ', '-').replace(' .', '-').replace('.', '-').replace(' ', '-').replace(' ', '-').replace(' -', '').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-').replace('.', '-').replace('.', '-').replace('(', '').replace('(', '').replace(')', '').replace(')', '').replace(')', '').replace(')', '').replace(',', '').replace(',', '').replace('Ñ', 'n').replace('Ñ', 'n').replace('ª', '').replace('ª', '').replace('?', '-').toLowerCase();
                 nombref = nombref.replace(/á/gi, "a");
                 nombref = nombref.replace(/é/gi, "e");
                 nombref = nombref.replace(/í/gi, "i");
                 nombref = nombref.replace(/ó/gi, "o");
                 nombref = nombref.replace(/ó/gi, "o");
                 nombref = nombref.replace(/ó/gi, "o");
                 nombref = nombref.replace(/ú/gi, "u");
                 openInNewTab("http://opendata.euskadi.eus/catalogo/-/fundacion/", nombref);
             });
             var dataPacks = [];
             var dates = [featureEvent.data.year];
             var nombreFundacion = featureEvent.data.nombre;
             nombreFundacion = nombreFundacion.replace(/'/g, "''");
             var query = "SELECT A.gender,COUNT(*) FROM founders_entities_v3 A JOIN founders_v1 B ON A.nombre = B.nombre WHERE B.nombre_fundacion IN ('" + nombreFundacion + "') GROUP BY A.gender ORDER BY A.gender";
             // Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';
             SQL_CLIENT.request({
                     params: {
                         q: query
                     },
                 })
                 .then(function(response) {
                     if (response && response.data) {
                         //console.log(response.data);
                         dataArray = [];
                         labelsArray = [];
                         var sumaPersonas = 0;
                         for (var z = 0; z < response.data.rows.length; z++) {
                             if (response.data.rows[z]['gender'] == "Hombre" || response.data.rows[z]['gender'] == "Mujer") {
                                 sumaPersonas += response.data.rows[z]['count'];
                             } else if (response.data.rows[z]['gender'] == "Entidad") {
                                 labelsArray.push("Personas");
                                 dataPacks.push(sumaPersonas);

                                 labelsArray.push("Entidad");
                                 dataPacks.push(response.data.rows[z]['count']);
                                 //break;
                             }

                             if (z == response.data.rows.length - 1) {
                                 labelsArray.push("Personas");
                                 dataPacks.push(sumaPersonas);
                             }
                         }



                         datapackColors = getColorsArray(3);
                         console.log(dataPacks);
                         console.log(datapackColors);
                         data = {
                             datasets: [{
                                 data: dataPacks,
                                 backgroundColor: datapackColors
                             }],

                             // These labels appear in the legend and in the tooltips when hovering different arcs
                             labels: labelsArray
                         };

                         var bar_ctx = document.getElementById('fundadores-genero');
                         perInsChart = new Chart(bar_ctx, {
                             type: 'pie',
                             data: data,
                             options: {
                                 title: {
                                     display: true,
                                     text: 'Cantidad de fundadores según su tipología'
                                 },
                                 legend: {
                                     display: false
                                 },
                                 'onClick': function(evt, item) {
                                     var clickedItemValue = perInsChart.data.labels[item[0]._index];
                                     if (clickedItemValue == "Personas") {
                                         updatePerTipoPlotPersonasPerIns(perInsChart.data.labels[item[0]._index], nombreFundacion);
                                     }
                                 }
                             },
                             borderWidth: 1
                         });
                     }
                 })
                 .catch(function(error) {
                     //console.log(error);
                 });
         }
     }

     function closePopup(featureEvent) {
         popup.removeFrom(map);
     }

     // add popup
     citiesLayer.on('featureClicked', openPopup);
     //citiesLayer.on('featureOut', closePopup);


 }

 window.onload = main;