# -*- coding: utf-8 -*-
"""
Created on Tue Feb  6 21:00:08 2018

@author: Adrián Bazaga
"""

import os
import csv
import openpyxl as px
import sys
import unidecode

dataHeader = []
dataToExport = []

W = px.load_workbook('euskadi_fundaciones.xlsx')
p = W.get_sheet_by_name(name = 'Metadatos')

for index, row in enumerate(p.iter_rows()):
    rowData = []
    for k in row:
        if index is 0:
            dataHeader.append(unidecode.unidecode(str(k.internal_value).replace(" ", "_")).lower())
        else:
            rowData.append(str(k.internal_value))
    
    if index > 1:
        rowData = "|".join(rowData)
        dataToExport.append(rowData)

# Write to file
dataHeader = "|".join(dataHeader)

with open("euskadi_foundations_data_12feb.csv",'w') as resultFile:
    resultFile.write(dataHeader + "\n")
    for row in dataToExport:
        resultFile.write(row + "\n")
