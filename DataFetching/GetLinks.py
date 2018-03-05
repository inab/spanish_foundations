# -*- coding: utf-8 -*-
"""
@author: Adrián Bazaga
"""
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By

num_pages = 157

# Initialize search
driver = webdriver.Chrome()
driver.get("http://fundosbuscador.mjusticia.gob.es/fundosbuscador/cargaBuscador.action?lang=es_es")
time.sleep(5)
element = driver.find_element_by_xpath("//input[@value='Buscar'][not(@id='buscadorPortalBoton')]")
element.click()
time.sleep(5)
#

links = []

# Go page by page fetching the links
for i in range(num_pages):
    print("Aqui viene i")
    print(i)
    if i == 0:
        continue
    if i == 1:
        for row in driver.find_elements_by_css_selector("td.columna_01"):
            cell = row.find_element_by_tag_name("a")
            print(cell.get_attribute("href"))
            links.append(cell.get_attribute("href"))
        time.sleep(1)
    else:
        page = "http://fundosbuscador.mjusticia.gob.es/fundosbuscador/actualizarResultadoBusqueda.action?paginacion.index=" + str(i) + "&lang=es_es"
        driver.get(page)
        time.sleep(2)
        for row in driver.find_elements_by_css_selector("td.columna_01"):
            cell = row.find_element_by_tag_name("a")
            print(cell.get_attribute("href"))
            links.append(cell.get_attribute("href"))
        time.sleep(1)

driver.close()

uniqueLinksSet = set(links)
print("Links in the set")
for link in uniqueLinksSet:
    print(link)
    
print("Number of links:")
print(len(uniqueLinksSet))

with open('C:\\Users\\Adrián Bazaga\\Desktop\\BSC-Projects\\Project2\\LinksToFoundations.txt', mode='wt', encoding='utf-8') as myfile:
    myfile.write('\n'.join(uniqueLinksSet))