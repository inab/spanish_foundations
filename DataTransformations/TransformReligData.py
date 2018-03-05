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

W = px.load_workbook('./FoundationsData/Religiosas/ListadoEntidades.xlsx')
p = W.get_sheet_by_name(name = 'ListadoEntidades')

for index, row in enumerate(p.iter_rows()):
    rowData = []
    for k in row:
        if index is 0:
            if unidecode.unidecode(str(k.internal_value).replace(" ", "_")).lower() is "none":
                continue
            dataHeader.append(unidecode.unidecode(str(k.internal_value).replace(" ", "_")).lower())
        else:
            rowData.append(str(k.internal_value).replace('\n',' ').strip())
    
    if index > 1:
        rowData = "|".join(rowData)
        #print(rowData)
        if "FUNDAC" in rowData.split("|")[7]:
            dataToExport.append(rowData)

# Write to file
dataHeader = "|".join(dataHeader)

with open("foundations_relig-data_minjus_gobesp_13feb.csv",'w') as resultFile:
    dataHeaderSplitted = dataHeader.split("|")
    dataHeaderSplitted.pop(0)
    dataHeaderSplitted = dataHeaderSplitted[:-1]
    dataHeader = "|".join(dataHeaderSplitted)
    resultFile.write(dataHeader + "\n")
    for row in dataToExport:
        row = row.split("|")
        row.pop(0)
        row = row[:-1]
        row = "|".join(row)
        resultFile.write(row + "\n")
