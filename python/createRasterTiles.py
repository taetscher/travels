# -*- coding: utf-8 -*-

"""
WORK IN PROGRESS!
"""

from qgis.PyQt.QtCore import QCoreApplication
from PyQt5.QtGui import QColor
from qgis.core import (QgsProcessing,
                       QgsFeatureSink,
                       QgsProcessingException,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterFeatureSink,
                       QgsCoordinateReferenceSystem)
from qgis import processing

ras_lyr = ""

output_dir = ""

options = { 'BACKGROUND_COLOR' : QColor(0, 0, 0, 0), 'DPI' : 96,
            'EXTENT' : '7.501878702,7.677829421,46.690772302,46.776131294 [EPSG:4326]',
            'METATILESIZE' : 4,
            'OUTPUT_DIRECTORY' : '/Users/benischuepbach/Desktop/Coding/BWI/QGIS/smrTiles',
            'OUTPUT_HTML' : 'TEMPORARY_OUTPUT',
            'QUALITY' : 75, 'TILE_FORMAT' : 0,
            'TILE_HEIGHT' : 256, 'TILE_WIDTH' : 256,
            'TMS_CONVENTION' : False,
            'ZOOM_MAX' : 14,
            'ZOOM_MIN' : 7
            }

def createTiles(rasterLyr, optionsDict):
    """creates raster tiles from raster layer with qgis"""



    pass

def reproject(input_path, output_path, target_crs):

    """reprojects (warps) a raster"""



    """
    In order to display the tiles correctly, the CRS of the raster data has to be EPSG:4326 - WGS 84.
    Here one would probably have to transform the data, so that the extent can be read directly from the raster.
    """




    reproject_options = { 'DATA_TYPE' : 0,
                          'EXTRA' : '',
                          'INPUT' : input_path,
                          'MULTITHREADING' : False,
                          'NODATA' : None,
                          'OPTIONS' : '',
                          'OUTPUT' : output_path,
                          'RESAMPLING' : 0,
                          'SOURCE_CRS' : None,
                          'TARGET_CRS' : QgsCoordinateReferenceSystem(target_crs),
                          'TARGET_EXTENT' : None,
                          'TARGET_EXTENT_CRS' : None, 'TARGET_RESOLUTION' : None }

    processing.run("gdal:warpreproject", reproject_options)
    print("done")



if __name__ == "__main__":


    input = "/Users/benischuepbach/Desktop/Coding/BWI/QGIS/test_data/smr25_2016_1207_krel_1.25_2056.tif"
    output = "/Users/benischuepbach/Desktop/Coding/BWI/QGIS/test_data/reprojected_smr25.tif"
    crs = 'EPSG:4326'

    reproject(input, output, crs)