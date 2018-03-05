# -*- coding: utf-8 -*-
"""
@author: Adrián Bazaga
"""
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from tkinter import *
from tkinter.filedialog import askopenfilename

foundationsLinks = []

fname = askopenfilename()
with open(fname) as f:
    foundationsLinks = f.readlines()

# Initialize search
driver = webdriver.Chrome()

header =
#Nom|Adreça|Codi postal i ciutat|Regió|Telèfon|Correu electrònic|Director i/o gerent
#|Persona de contacte|Data, creació de la fundació|Fundadors|Història|Objectius
#|Àrees d'activitats|Activitats representatives|Tipus d'activitats
#|Sectors atesos: Culturals, recerca, medi ambient o cooperació
#|Sectors atesos: serveis socials i salut|Àmbit geogràfic d'actuació
#|Pressupost anual|Participació en altres organismes|Patronat|Nombre de registre
#|Data de registre|Informació legal|Any de les dades
headerLengths = []

for foundationIdx, link in enumerate(foundationsLinks):
    dataHeader = []
    #if foundationIdx < 2868:
        #continue
    driver.get(link)
    time.sleep(5)
    #outputData = []
    #foundationId = -1
    for idx, row in enumerate(driver.find_elements_by_css_selector("tr")):
        if foundationIdx is 0:
            if idx is 0:
                continue
            dataHeader.append(row.find_element_by_css_selector("td.label").text)
            label = row.find_element_by_css_selector("td.label").text
            value = row.find_element_by_css_selector("td.value").text
            print(label + "][" + value)
        else:
            if idx is 0:
                continue
            dataHeader.append(row.find_element_by_css_selector("td.label").text)
            label = row.find_element_by_css_selector("td.label").text
            value = row.find_element_by_css_selector("td.value").text
            print(label + "][" + value)

    print(len(dataHeader))
    headerLengths.append(len(dataHeader))
    dataHeader = "|".join(dataHeader)
    print(dataHeader)
    #outputFileName = "C:\\Users\\Adrián Bazaga\\Desktop\\BSC-Projects\\Project2\\FoundationsData\\" + str(foundationIdx)
    #outputFile = open(outputFileName,'w+')
    #for string in outputData:
    #    outputFile.write(string)
    #outputFile.close()
    #if foundationIdx > 10:
        #sys.exit(1)

driver.close()

print ("Max header length : ", max(headerLengths))