# -*- coding: utf-8 -*-
"""
Created on Tue Feb  6 21:00:08 2018

@author: Adrián Bazaga
"""

import os
import csv
import sys
import PyPDF2

path = './FoundationsData/Aragon/DIRECTORIOFUNDACIONESARAGON2017.pdf'

pdfFileObj = open(path,'rb')     #'rb' for read binary mode
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
print(pdfReader.numPages)

pageObj = pdfReader.getPage(27)
print(pageObj.extractText())