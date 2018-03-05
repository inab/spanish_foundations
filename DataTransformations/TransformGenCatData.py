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
from xml.dom import minidom
import xml.etree.ElementTree as ET
import re

dataHeader = "nom|tipus|numero_inscripcio|data_inscripcio|adreca|poblacio|codiPostal|comarca|classificacioGeneral|classificacioEspecifica"
dataToExport = []

# parse an xml file by name
mydoc = minidom.parse('./FoundationsData/GenCat/llistatEntitats-fundacions.xml')

items = mydoc.getElementsByTagName('entitat')

for elem in items:
    foundationData = []
    text = elem.toxml()

    foundationName = text[text.find("<nom>")+5:text.find("</nom>")]
    foundationType = text[text.find("<tipus>")+7:text.find("</tipus>")]
    foundationRegisterNumber = text[text.find("<numeroInscripcio>")+18:text.find("</numeroInscripcio>")]
    foundationRegisterDate = text[text.find("<dataInscripcio>")+16:text.find("</dataInscripcio>")]
    foundationAddress = text[text.find("<adreca>")+8:text.find("</adreca>")]
    foundationPoblacio = text[text.find("<poblacio>")+10:text.find("</poblacio>")]
    foundationCodiPostal = text[text.find("<codiPostal>")+12:text.find("</codiPostal>")]
    foundationComarca = text[text.find("<comarca>")+9:text.find("</comarca>")]
    foundationClassificacioGeneral = text[text.find("<classificacioGeneral>")+22:text.find("</classificacioGeneral>")]
    foundationClassificacioEspecifica = ""
    if text.find("<classificacioEspecifica>") is not -1:
        foundationClassificacioEspecifica = text[text.find("<classificacioEspecifica>")+25:text.find("</classificacioEspecifica>")]
    
    foundationData.append(foundationName.strip().replace("&quot;","\""))
    foundationData.append(foundationType.strip())
    foundationData.append(foundationRegisterNumber.strip())
    foundationData.append(foundationRegisterDate.split(" ")[0].replace("-","/").strip())
    foundationData.append(foundationAddress.strip())
    foundationData.append(foundationPoblacio.strip())
    foundationData.append(foundationCodiPostal.strip())
    foundationData.append(foundationComarca.strip())
    foundationData.append(foundationClassificacioGeneral.strip())
    foundationData.append(foundationClassificacioEspecifica.strip())

    dataToExport.append("|".join(foundationData))
    
    #print("|".join(foundationData))
    
 #Export foundations data to CSV
with open("gencat_foundations_data_12feb.csv",'w') as resultFile:
    resultFile.write(dataHeader + "\n")
    for row in dataToExport:
        resultFile.write(row + "\n")