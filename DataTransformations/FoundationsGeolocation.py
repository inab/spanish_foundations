# -*- coding: utf-8 -*-
"""
Created on Mon Feb 26 08:49:24 2018

@author: Adrián Bazaga
"""

import csv
import sys
import MySQLdb
import re
from geopy.geocoders import Nominatim
import json
import geocoder
import os
import numpy as np

def create_random_point(x0,y0,distance):
    """
            Utility method for simulation of the points
    """   
    r = distance/ 111300
    u = np.random.uniform(0,1)
    v = np.random.uniform(0,1)
    w = r * np.sqrt(u)
    t = 2 * np.pi * v
    x = w * np.cos(t)
    x1 = x / np.cos(y0)
    y = w * np.sin(t)
    return (x0+x1, y0 +y)
 
geolocator = Nominatim()
# Open database connection
db = MySQLdb.connect("localhost","root","mysql4321","project2" )
cursor = db.cursor()
cursor.execute("SELECT id,domicilio,localidad,codigo_postal,provincia FROM foundations WHERE latitude IS NULL ORDER BY RAND()")
#cursor.execute('SELECT id,domicilio,localidad,codigo_postal,provincia FROM foundations WHERE domicilio LIKE "%Gran V%" AND provincia = "Madrid" ORDER BY RAND()')
for row in cursor:
    try:
        print('wtf')
        storeRow = row;
        foundationId = row[0]
        fullAddress = row[1] + ", " + row[2] + ", " + row[3] + ", " + row[4]
        #print(fullAddress)
        #geocode_result = gmaps.geocode(fullAddress)
        varDomicilio = row[1].strip();
        if(varDomicilio.count("-") > 0):
            varDomicilio = varDomicilio.split("-")[0].strip();
            
        if(varDomicilio.count("º") > 0 and varDomicilio.count("nº") < 1):
            varDomicilio = varDomicilio.split("º")[0].strip();
            
        if(varDomicilio.count("º") > 0 and varDomicilio.count("nº") > 0):
            splittedDom = varDomicilio.split("º");
            varDomicilio = splittedDom[0].strip() + " " + splittedDom[1].strip();
            
        if(varDomicilio.count("º") > 0):
            varDomicilio = varDomicilio.split("º")[0].strip();
            
        if(varDomicilio.count("s/n") > 0):
            varDomicilio = varDomicilio.split("s/n")[0].strip();
 
        if("edificio" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("edificio");
            varDomicilio = splitDomicilio[0].strip();
            
        if("manzana" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("manzana");
            varDomicilio = splitDomicilio[0].strip();
            
        if("dcha" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("dcha");
            varDomicilio = splitDomicilio[0].strip();
            
        if("entr." in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("entr.");
            varDomicilio = splitDomicilio[0].strip();
            
        if(" ent" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split(" ent");
            varDomicilio = splitDomicilio[0].strip();
            
        if(" bis" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split(" bis");
            varDomicilio = splitDomicilio[0].strip();
            
        if("izqd" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("izqd");
            varDomicilio = splitDomicilio[0].strip();
            
        if(" izq" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split(" izq");
            varDomicilio = splitDomicilio[0].strip();
            
        if("Ptª" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("Ptª");
            varDomicilio = splitDomicilio[0].strip();
            
        if(" ático" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split(" ático");
            varDomicilio = splitDomicilio[0].strip();
            
        if("oficina" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("oficina");
            varDomicilio = splitDomicilio[0].strip();
            
        if("edif." in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("edif.");
            varDomicilio = splitDomicilio[0].strip();
            
        if("urbani" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("urbani");
            varDomicilio = splitDomicilio[0].strip();
            
        if("local" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("local");
            varDomicilio = splitDomicilio[0].strip();
            
        # Yes, panta, as it's written on the registers sometimes.
        if("panta" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("panta");
            varDomicilio = splitDomicilio[0].strip();
            
        if("parcela" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("parcela");
            varDomicilio = splitDomicilio[0].strip();
            
        if("derecha" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("derecha");
            varDomicilio = splitDomicilio[0].strip();
            
        if("izquierda" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("izquierda");
            varDomicilio = splitDomicilio[0].strip();
            
        if("entresuelo" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("entresuelo");
            varDomicilio = splitDomicilio[0].strip();
            
        if("duplicado" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("duplicado");
            varDomicilio = splitDomicilio[0].strip();
        
        if("entlo." in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("entlo.");
            varDomicilio = splitDomicilio[0].strip();
            
        if(" bajo" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split(" bajo");
            varDomicilio = splitDomicilio[0].strip();
            
        if(varDomicilio.count(",") > 1):
            splitDomicilio = varDomicilio.split(",");
            varDomicilio = splitDomicilio[0].strip() + ", " + splitDomicilio[1].strip();
            
        if(varDomicilio.count("(") > 1):
            splitDomicilio = varDomicilio.split("(");
            varDomicilio = splitDomicilio[0].strip();
            
        if(varDomicilio.count("ª") > 0):
            splitDomicilio = varDomicilio.split("ª");
            varDomicilio = splitDomicilio[0].strip();
            
        varDomicilio = varDomicilio.replace(".","").replace("nº","").replace("º","");
        if("planta" in varDomicilio.lower()):
            splitDomicilio = varDomicilio.lower().split("planta");
            varDomicilio = splitDomicilio[0].strip() + ", " + splitDomicilio[1].strip();
    
        varDomicilio += ", " + row[3] + ", " + row[4];
        print('Localizando: ', (varDomicilio))
        #location = geolocator.geocode(varDomicilio)
        g = geocoder.google(varDomicilio, key="AIzaSyBKihIhLRuVpx58ukb2m8lz2Cq6YI00J6g")
        #g;
        print(g)
        #g.json = None
        if g.json is None:
            print('Fail Localizacion 1')
            continue
        
        print('Localizado: ', g.json['lat'], g.json['lng'])
        
        # Check for duplicated lat,lon
        print('testtt1')
        dupQuery = "SELECT COUNT(*) FROM foundations WHERE latitude = \"";
        dupQuery += str(g.json['lat']) + "\"" + " AND longitude = \"";
        dupQuery += str(g.json['lng']) + "\"";
        cursor.execute(dupQuery)
        result=cursor.fetchone()
        number_of_rows=result[0]
        print('testtt2')
        print(number_of_rows)
        
        if number_of_rows > 0:
            newX,newY = create_random_point(g.json['lat'],g.json['lng'] ,20 )
            cursor2 = db.cursor()
            cursor2.execute ("UPDATE foundations SET latitude = %s WHERE id=%s", (newX,foundationId))
            db.commit()
    
            cursor2 = db.cursor()
            cursor2.execute ("UPDATE foundations SET longitude = %s WHERE id=%s", (newY,foundationId))
            db.commit()
        else:
            cursor2 = db.cursor()
            cursor2.execute ("UPDATE foundations SET latitude = %s WHERE id=%s", (g.json['lat'],foundationId))
            db.commit()
    
            cursor2 = db.cursor()
            cursor2.execute ("UPDATE foundations SET longitude = %s WHERE id=%s", (g.json['lng'],foundationId))
            db.commit()
    except Exception as e:
        print(e)
        continue
    

# disconnect from server
db.close()