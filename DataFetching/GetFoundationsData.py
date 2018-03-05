# -*- coding: utf-8 -*-
"""
@author: Adrián Bazaga
"""
import time
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

for foundationIdx, link in enumerate(foundationsLinks):
    if foundationIdx < 2868:
        continue
    driver.get(link)
    time.sleep(5)
    outputData = []
    foundationId = -1
    for idx, row in enumerate(driver.find_elements_by_css_selector("ul")):
        if idx > 13:
            outputData.append("---\n")
        if idx > 18:
            break
        if idx > 12:
            if idx == 13:
                outputData.append("Nombre fundación:\n")
                outputData.append(driver.find_elements_by_css_selector("h3")[1].text)
                outputData.append("\n")
            if idx == 14:
                outputData.append("Fines:\n")
            if idx == 15:
                outputData.append("Actividades:\n")
            if idx == 16:
                outputData.append("Fundadores:\n")
            if idx == 17:
                outputData.append("Patronos:\n")
            if idx == 18:
                outputData.append("Directivos:\n")
            for item in row.find_elements_by_css_selector("li"):
                outputData.append(item.text + "\n")

    outputFileName = "C:\\Users\\Adrián Bazaga\\Desktop\\BSC-Projects\\Project2\\FoundationsData\\" + str(foundationIdx)
    outputFile = open(outputFileName,'w+')
    for string in outputData:
        outputFile.write(string)
    outputFile.close()

driver.close()