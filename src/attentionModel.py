import torch
import torch.nn as nn

class LSTMRegressor(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(LSTMRegressor, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers

        # Define LSTM layer
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)

        # Fully connected layer to output regression value
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        # Initialize hidden state and cell state for LSTM
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)

        # Forward propagate through LSTM
        out, _ = self.lstm(x, (h0, c0))

        # Output regression value through the fully connected layer
        out = self.fc(out[:, -1, :])  # Take output of the last time step
        return out

# Parameters
input_size = 2          # (x, y) coordinates
hidden_size = 64        # Number of LSTM units
num_layers = 2          # Number of LSTM layers
output_size = 1         # Regression output (e.g., a continuous value)

# Create model
model = LSTMRegressor(input_size, hidden_size, num_layers, output_size)

# Print the model architecture
print(model)

# model.train()
# output = model([400, 500])
# print(output)