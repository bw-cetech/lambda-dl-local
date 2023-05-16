import numpy as np
from numpy import array
import matplotlib.pyplot as plt

import os

from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from tensorflow.python.keras import layers, models, Model # , optimizers
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing.image import load_img, img_to_array




class Model():

    def runInference(self,dlImage):
        model = load_model("python/traffic-NOF-3dec21.h5")
        sign2infer = "static/uploads/" + dlImage

        test_datagen =  ImageDataGenerator(
            rescale=1./255
        )

        img_height, img_width = 224,224

        category_names = ["Bikes","Forbidden_for_traffic", "Intersection", "No_entry", "Pedestrians", "Right_of_way", "Slippery_road", "Speed_60", "Stop", "Yield", "Festive"]


        img = image.load_img(sign2infer,color_mode='rgb', target_size=(224, 224))
        image_array = image.img_to_array(img)
        image_array = np.expand_dims(image_array, axis=0)

        #normalize image - important otherwise all classifications will have probability 1
        image_array = image_array / 255.0

        predProb=model.predict([image_array])[0]
        pred=np.argmax(predProb)
        print(predProb)
        print(pred)
        print_msg = str(category_names[pred-1]) + " (probability: " + str(np.max(predProb)) + ")"

        return print_msg
        

