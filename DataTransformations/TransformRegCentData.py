# -*- coding: utf-8 -*-
"""
Created on Tue Feb  6 21:00:08 2018

@author: Adrián Bazaga
"""

import os
import csv
import sys

path = './FoundationsData/RegCen/'

dataHeader = 'nombre|num_registro|fecha_constitucion|fecha_inscripcion|domicilio|localidad|codigo_postal|provincia|telefono|fax|correo_electronico|web|fines|actividades|fundadores|patronos'
dataToExport = []

# Read every foundation file
for filename in os.listdir(path):
    datosbasicos = []
    actividades = []
    fundadores = []
    patronos = []
    actividadesFinished = False
    fundadoresFinished = False
    
    with open(path + filename) as f:
        lines = [line.rstrip('\n') for line in f]
        for index, line in enumerate(lines):
            #print(index, line)
            if index > 0 and index < 13:
                splitLine = line.split(": ")
        
                if(len(splitLine) > 1 and index is 1):
                    datosbasicos.append(line)
                    #print(splitLine[1])
                if(len(splitLine) > 1 and index is not 1):
                    datosbasicos.append(splitLine[1])
                    #print(splitLine[1])
                if index is 1 and len(splitLine) < 2:
                    datosbasicos.append(splitLine[0])
                    #print(splitLine[0])
                if index is not 1 and len(splitLine) < 2:
                    datosbasicos.append("")
                #sys.exit(0)
            if index is 15:
                datosbasicos.append(line)
                
            if index > 17 and actividadesFinished is False:
                if "---" in line:
                    actividadesFinished = True
                    continue
                else:
                    actividades.append(line[:-3])
                    continue
            
            if index > 17 and actividadesFinished is True and fundadoresFinished is False:
                if "---" in line:
                    fundadoresFinished = True
                    continue
                else:
                    fundadores.append(line)
                    continue
                
            if index > 17:
                if "---" in line:
                    break
                else:
                    patronos.append(line)
                    continue
                
                    
        # Remove unwanted items
        if len(fundadores) > 0:
            fundadores.pop(0)
            
        if len(patronos) > 0:
            patronos.pop(0)
        
        # Format accordingly
        datosbasicos = "|".join(datosbasicos)
        fundadores = ",".join(fundadores)
        fundadores = "[" + fundadores + "]"
        patronos = ",".join(patronos)
        patronos = "[" + patronos + "]"
        actividades = ",".join(actividades)
        actividades = "[" + actividades + "]"
        
        '''
        print('Datos basicos:')
        print(datosbasicos)
        
        print('Actividades:')
        print(actividades)
            
        print('Fundadores:')
        print(fundadores)
            
        print('Patronos:')
        print(patronos)
        '''
        
        if len(fundadores) is 0 and len(patronos) is 0:
            continue
        
        completeFoundationData = datosbasicos + "|" + actividades + "|" + fundadores + "|" + patronos
        if(len(datosbasicos.split("|")) < 4):
            continue
        dataToExport.append(completeFoundationData)

#Export foundations data to CSV
with open("foundations_data_minjus_gobesp_12feb_v2.csv",'w') as resultFile:
    resultFile.write(dataHeader + "\n")
    for row in dataToExport:
        resultFile.write(row + "\n")