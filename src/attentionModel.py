import torch
import torch.nn as nn
import pandas as pd
import numpy as np


# Reading the large text file containing coordinates data
file_path = './src/data/attention.txt'

with open(file_path, 'r') as file:
    lines = file.readlines()

# Process each line to extract x and y coordinates, ensuring proper parsing
coordinates = []
for line in lines:
    line = line.strip()  # Remove any leading/trailing whitespace
    if line:  # Check if the line is not empty
        try:
            # Remove brackets and split by comma
            x, y = map(float, line.strip('[]').split(','))
            coordinates.append([x, y])  # Append as a pair of x, y
        except ValueError:
            print(f"Skipping line due to parsing error: {line}")

# Convert the list of coordinates to a NumPy array
coordinates_array = np.array(coordinates)



import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Convert the numpy arrays to PyTorch tensors
coordinates_tensor = torch.tensor(coordinates_array, dtype=torch.float32)
focus_scores_tensor = torch.tensor(np.full(len(coordinates_array), 1), dtype=torch.float32)

# Create a dataset and loader
dataset = TensorDataset(coordinates_tensor, focus_scores_tensor)
data_loader = DataLoader(dataset, batch_size=32, shuffle=True)  # Adjust batch size as needed

# Define the LSTM Model for regression
class FocusLSTM(nn.Module):
    def __init__(self, input_size=2, hidden_size=50, num_layers=2):
        super(FocusLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)  # Output a single focus score

    def forward(self, x):
        # x: [batch_size, sequence_length, input_size]
        h0 = torch.zeros(2, x.size(0), 50).to(x.device)  # Initialize hidden state
        c0 = torch.zeros(2, x.size(0), 50).to(x.device)  # Initialize cell state
        out, _ = self.lstm(x, (h0, c0))  # LSTM output
        out = self.fc(out[:, -1, :])  # Use the last time step output
        return torch.sigmoid(out)  # Sigmoid to map to range [0, 1]

# Instantiate the model, define loss function and optimizer
model = FocusLSTM()
criterion = nn.MSELoss()  # MSE for regression
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 50  # Adjust epochs as needed
for epoch in range(num_epochs):
    model.train()
    for inputs, targets in data_loader:
        # Add a sequence dimension of length 1 since we're working with individual coordinate pairs
        inputs = inputs.unsqueeze(1)  # Shape: [batch_size, 1, 2]
        targets = targets.unsqueeze(1)  # Shape: [batch_size, 1]
        
        # Forward pass
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        
        # Backward pass and optimization
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Model evaluation can be done similarly by disabling gradients and testing on a validation dataset
