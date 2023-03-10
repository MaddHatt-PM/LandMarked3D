import os
from fnmatch import fnmatch
from pathlib import Path
import sys

"""
ipcFromRendererEvents <=> ipcToMainEvents
ipcToRendererEvents <=> ipcFromMainEvents
"""


def print_help():
    print("mkEventMessages.py", "<toMain | toRenderer> <event-string-as-dash-case>")
    sys.exit(0)


"""Change cwd to script's location"""
dirname = os.path.dirname(__file__)
os.chdir(dirname)


"""Gather input variables from sys args"""
args = sys.argv
args.pop(0)  # remove script name
event_direction = ""
if "help" in sys.argv:
    print_help()
if "toMain" in args:
    event_direction = args.pop(args.index("toMain"))
elif "toRenderer" in args:
    event_direction = args.pop(args.index("toRenderer"))
else:
    print("ERROR: Event direction not found in arguements")
    print_help()

event_name = args.pop(0)
event_name = event_name.replace(" ", "-").lower()
key_name = event_name.replace("-", " ").title().replace(" ", "")
key_name = key_name[0].lower() + key_name[1:]

if event_name[0:3] == 'it-':
    key_name = 'IT_' + key_name[2:]

if key_name[0].isalpha() == False:
    print("ERROR: Event names need to start with an alphabetic character for JS.")
    print("Aborting...")
    sys.exit(1)


"""Prepare files"""
fromRendererPath = Path("../electron/events/ipc-from-renderer-events.ts")
toRendererPath = Path("../electron/events/ipc-to-renderer-events.ts")
fromMainPath = Path("../src/Events/ipc-from-main-events.ts")
toMainPath = Path("../src/Events/ipc-to-main-events.ts")

if event_direction == "toMain":
    targets = [fromRendererPath, toMainPath]

if event_direction == "toRenderer":
    targets = [fromMainPath, toRendererPath]

event_to_add = "  {}: '{}',\n".format(key_name, event_name)


"""Insert event if it doesn't yet exist"""
for target in targets:
    with target.open("r") as file:
        output = file.read()

    if key_name in output or event_name in output:
        print("ERROR: Event already exists as a key or as an event string.")
        print("   {}:{}".format(key_name, event_name))
        print("   Aborting...")
        sys.exit(1)

    output: list = output.split("}")
    output[-2] = output[-2] + event_to_add
    output = "}".join(output)

    with target.open("w") as file:
        file.write(output)
