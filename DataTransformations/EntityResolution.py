# -*- coding: utf-8 -*-
"""
Created on Tue Feb 13 17:39:04 2018

@author: Adrián Bazaga
"""

def levenshteinDistance(s1, s2):
    if len(s1) > len(s2):
        s1, s2 = s2, s1

    distances = range(len(s1) + 1)
    for i2, c2 in enumerate(s2):
        distances_ = [i2+1]
        for i1, c1 in enumerate(s1):
            if c1 == c2:
                distances_.append(distances[i1])
            else:
                distances_.append(1 + min((distances[i1], distances[i1 + 1], distances_[-1])))
        distances = distances_
    return distances[-1]

print(levenshteinDistance("caixa","mere lourdes"))
print(levenshteinDistance("mere","mere lourdes"))