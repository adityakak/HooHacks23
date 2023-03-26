from flask import Flask, request, jsonify
import torch
import matplotlib.pyplot as plt
import cv2
import time
import base64
from PIL import Image
import io
import numpy as np

app = Flask(__name__)

# Initialize the machine learning model in a setup method
# model_type = "DPT_Large"     # MiDaS v3 - Large     (highest accuracy, slowest inference speed)
# model_type = "DPT_Hybrid"   # MiDaS v3 - Hybrid    (medium accuracy, medium inference speed)
model_type = "MiDaS_small"  # MiDaS v2.1 - Small   (lowest accuracy, highest inference speed)

midas = torch.hub.load("intel-isl/MiDaS", model_type, trust_repo=True)

# device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
device = torch.device("cpu")
midas.to(device)
midas.eval()


midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")

if model_type == "DPT_Large" or model_type == "DPT_Hybrid":
    transform = midas_transforms.dpt_transform
else:
    transform = midas_transforms.small_transform

def distance(output):
    (width, height) = output.shape
    left_width, right_width = ((width / 2) - (width * .075)), ((width / 2) + (width * .075))
    bottom_height, top_height = ((height / 2) - (height * .05)), ((height / 2) + (height * .05))

    left_width, right_width = int(left_width), int(right_width)
    top_height, bottom_height = int(top_height), int(bottom_height)

    # print(left_width, right_width)
    new_output = output[left_width:right_width, bottom_height:top_height]
    return np.median(new_output)

def distanceToFrequency(dist):
    if dist < 200:
        dist = 200
    elif dist > 800:
        dist = 800

    ans = round(((5 / 3) * dist + (200 / 3))/25)*25

    if ans > 1400:
        ans = 1400
    elif ans < 400:
        ans = 400

    # return (ans/400)**2
    return repr(ans)

def generateHeatmap(output):
    return -1

@app.route('/hello')
def hello():
    return "hello world!"

@app.route('/bob')
def bob():
    return "bob"


# Define a route for the API
@app.route('/upload', methods=['POST'])
def upload():
    if(request.method == "POST"):
        # print(request.get_data())
        data = request.json["testNumber"]
        # print(data)
        ans = int(data) + 1

        # print(ans)
        img_data = request.json["photo"]
        decoded_img_data = base64.b64decode(img_data)
        prev_img = Image.open(io.BytesIO(decoded_img_data))
        img = np.array(prev_img.convert('RGB'))

        input_batch = transform(img).to(device)

        with torch.no_grad():
            prediction = midas(input_batch)

            prediction = torch.nn.functional.interpolate(
                prediction.unsqueeze(1),
                size=img.shape[:2],
                mode="bicubic",
                align_corners=False,
        ).squeeze()
        
        output = prediction.cpu().numpy()


        # plt.imshow(output, cmap='plasma')
        # plt.show()

        # print(output)
        dist = distance(output)
        print('Distance: ' + repr(dist))
        frequencyString = distanceToFrequency(dist)
        print(frequencyString)
        return jsonify({'result': ans, 'frequency': frequencyString})


if __name__ == '__main__':
    app.run(host = "0.0.0.0", port=5000)