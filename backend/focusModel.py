import torch
import torch.nn as nn
import torch.optim as optim
import torch
from torch.utils.data import DataLoader, TensorDataset, random_split

import numpy as np

class FocusLSTM(nn.Module):
    def __init__(self, input_size=2, hidden_size=64, num_layers=2, output_size=2):
        super(FocusLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        print(x.dim)
        lstm_out, _ = self.lstm(x)  # LSTM output
        out = self.fc(lstm_out[:, -1, :])  # Use the last time step's output
        return out