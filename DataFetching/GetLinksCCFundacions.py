# -*- coding: utf-8 -*-
"""
@author: Adrián Bazaga
"""
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By

num_pages = 58

# Initialize search
driver = webdriver.Chrome()
driver.get("http://www.ccfundacions.cat/fundacions")
time.sleep(5)
#

links = []

# Go page by page fetching the links
for i in range(num_pages):
    print("Aqui viene i")
    print(i)
    page = "http://www.ccfundacions.cat/fundacions?page=" + str(i)
    driver.get(page)
    time.sleep(2)
    if i < 59:
        for row in driver.find_elements_by_css_selector("div.member"):
            cell = row.find_element_by_tag_name("a")
            print(cell.get_attribute("href"))
            links.append(cell.get_attribute("href"))
        for row in driver.find_elements_by_css_selector("span.field-content"):
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

with open('C:\\Users\\Adrián Bazaga\\Desktop\\BSC-Projects\\Project2\\LinksToCCFundacions.txt', mode='wt', encoding='utf-8') as myfile:
    myfile.write('\n'.join(uniqueLinksSet))
