# -*- coding: utf-8 -*-
"""
Created on Mon Feb 26 08:49:24 2018

@author: Adrián Bazaga
"""

import csv
import sys
import MySQLdb
import re

# Open database connection
db = MySQLdb.connect("localhost","root","mysql4321","project2" )

with open('foundations_data_minjus_gobesp_12feb_v2.csv', 'r') as csvfile:
    foundationsData = csv.reader(csvfile, delimiter='|', quotechar='"')
    for index, row in enumerate(foundationsData):
        if index is 0:
            continue
        print(','.join(row))
        print(len(row))
        cursor = db.cursor()
        cursor.execute ("INSERT INTO foundations (nombre,num_registro,fecha_constitucion,fecha_inscripcion,domicilio,localidad,codigo_postal,provincia,telefono,fax,correo_electronico,web,fines,actividades) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (
                        row[0],
                        row[1].encode('utf-8'),
                        row[2].encode('utf-8'),
                        row[3].encode('utf-8'),
                        row[4].replace(u'\u2013','').replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019',''),
                        row[5],
                        row[6],
                        row[7],
                        row[8].encode('utf-8'),
                        row[9].encode('utf-8'),
                        row[10].encode('utf-8'),
                        row[11].encode('utf-8'),
                        row[12].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026',''),
                        row[13].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').replace(u'\u2018','')))
        db.commit()
        
        
# disconnect from server
db.close()