
import os
import subprocess
import sys


"""Change cwd to script's location"""
dirname = os.path.dirname(__file__)
os.chdir(dirname)


"""Gather input variables from sys args"""
args = sys.argv
args.pop(0)  # remove script name

event_name = 'it-' + args.pop(0)
subprocess.call('python mkEventMessages.py toMain ' + event_name, shell=True)
subprocess.call('python mkEventMessages.py toMain ' + event_name + '-clean', shell=True)
subprocess.call('python mkEventMessages.py toRenderer ' + event_name + '-result', shell=True)