from flask import Flask, request
import torch
import matplotlib.pyplot as plt
import cv2
import time

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

cuda_id = torch.cuda.current_device()
print(torch.cuda.current_device())

print(torch.cuda.get_device_name(cuda_id))

midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")

if model_type == "DPT_Large" or model_type == "DPT_Hybrid":
    transform = midas_transforms.dpt_transform
else:
    transform = midas_transforms.small_transform


# Define a route for the API
@app.route('/', methods=['POST'])
def predict():
    # Get the request data
    data = request.json["image"]

    # Make a prediction using the model

    # Return the prediction as a JSON response

    img = cv2.imread(data)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    input_batch = transform(img).to(device)

    start = time.perf_counter()

    with torch.no_grad():
        prediction = midas(input_batch)

        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=img.shape[:2],
            mode="bicubic",
            align_corners=False,
        ).squeeze()

    print(time.perf_counter() - start)

    output = prediction.cpu().numpy()

    result = 5

    return {'result': result}

if __name__ == '__main__':
    app.run(debug=True)