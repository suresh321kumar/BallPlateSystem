import re
import time

class pid_controller(object):
    def __init__(self, current_time=None):
        file = open("variables.conf","r")
        lines = file.readlines()
        kp=float(re.split(':',lines[7])[1])
        ki=float(re.split(':',lines[8])[1])
        kd=float(re.split(':',lines[9])[1])
        out_min=re.split(':',lines[10])[1]
        out_max=re.split(':',lines[11])[1]
        file.close()
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.out_min = out_min
        self.out_max = out_max
        self.sample_time = 0.00
        self.current_time = current_time if current_time is not None else time.time()
        self.previous_time = self.current_time
        self.last_error = 0.00

    def compute_pid(self, error, current_time=None):
        self.current_time = current_time if current_time is not None else time.time()
        elasped_time = self.current_time - self.previous_time

        self.cumulative_error += error*self.elasped_time
        self.rate_error = (error - self.last_error)/self.elasped_time
        if self.cumulative_error > 20:
            self.cumulative_error = 20
        if self.cumulative_error < -20:
            self.cumulative_error = -20

        self.output = self.kp*error + self.ki*cumulative_error + self.kd*rate_error

        self.last_error = error
        self.previous_time = self.current_time

        if self.output > self.out_max:
            self.output = self.out_max
        if self.output < self.out_min:
            self.output = self.out_min
        
        

    