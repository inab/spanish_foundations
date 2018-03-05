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

# Foundations
'''
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
        
'''

# Founders
'''
with open('foundations_data_minjus_gobesp_12feb_v2.csv', 'r') as csvfile:
    foundationsData = csv.reader(csvfile, delimiter='|', quotechar='"')
    for index, row in enumerate(foundationsData):
        if index is 0:
            continue
        #print(','.join(row))
        print(len(row))
        print(row[0])
        print(row[len(row)-2])
        founders = row[len(row)-2].replace("[","").replace("]","").replace(", S.L", " S.L").replace(", Sociedad "," Sociedad ").replace(", S.A", " S.A").replace(", INC"," INC").replace(", S. A"," S.A").replace(", S. L"," S.L").split(",")
        for founder in founders:
            cursor = db.cursor()
            if "|" in founder:
                continue
            if founder:
                cursor.execute ("INSERT INTO founders (nombre,nombre_fundacion) VALUES (%s,%s)", (
                        founder.replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip(),
                        row[0].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip()))
                db.commit()
            else:
                cursor.execute ("INSERT INTO founders (nombre,nombre_fundacion) VALUES (%s,%s)", (
                       "NODISPONIBLE",
                        row[0].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip()))
                db.commit()
'''
# Patrons
with open('foundations_data_minjus_gobesp_12feb_v2.csv', 'r') as csvfile:
    foundationsData = csv.reader(csvfile, delimiter='|', quotechar='"')
    for index, row in enumerate(foundationsData):
        if index is 0:
            continue
        #print(','.join(row))
        print(len(row))
        print(row[0])
        print(row[len(row)-1])
        patrons = row[len(row)-1].replace("[","").replace("]","").split(",")
        for patron in patrons:
            cursor = db.cursor()
            if "|" in patron:
                continue
            if patron:
                patronAux = patron + " "
                m = re.search("\d", patronAux)
                if m:
                    patronAux = patronAux[:m.start()]
                else:
                    m = re.search("-", patronAux)
                    if m:
                        patronAux = patronAux[:m.start()]

                cursor.execute ("INSERT INTO patrons (nombre,identificador,nivel,nombre_fundacion,nombre_completo) VALUES (%s,%s,%s,%s,%s)", (
                        patronAux.replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip(),
                        None,
                        None,
                        row[0].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip(),
                        patron.replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip()))
                db.commit()
            else:
                cursor.execute ("INSERT INTO patrons (nombre,identificador,nivel,nombre_fundacion,nombre_completo) VALUES (%s,%s,%s,%s,%s)", (
                       "NODISPONIBLE",
                       None,
                       None,
                        row[0].replace(u'\u201c','').replace(u'\u201d','').replace(u'\u2019','').replace(u'\u2013','').replace(u'\u2014','').replace(u'\u2022','').replace(u'\u2026','').strip(),
                        "NODISPONIBLE"))
                db.commit()
                
# disconnect from server
db.close()