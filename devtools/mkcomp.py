import os
import sys
from pathlib import Path

"""Process and validate input"""
if len(sys.argv) == 1:
    print("Error: No component name given as second arguement")
    sys.exit()

comp_name = sys.argv[1]
comp_name = comp_name[0].upper() + comp_name[1:]
comp_dir = Path("../src/Components")

other_comps = []
for root, subdirs, files in os.walk(comp_dir):
    for sd in subdirs:
        other_comps.append(sd)

if comp_name in other_comps:
    print("Error: Component already exists")
    sys.exit()

comp_dir = comp_dir / comp_name
comp_dir.mkdir(parents=True, exist_ok=True)


"""Create Component file"""
comp_js = comp_dir / (comp_name + ".js")
with comp_js.open("w") as file:
    o = 'import React from "react";\n'
    o += 'import { Container } from "./' + comp_name + '.styles";\n'
    o += "\n"
    o += "const " + comp_name + " = () => {\n"
    o += "\n"
    o += "  return (\n"
    o += "    <Container>\n"
    o += "      \n"
    o += "    </Container>\n"
    o += "  );\n"
    o += "};\n"
    o += "\n"
    o += "export default " + comp_name + ";"
    file.write(o)


"""Create Styles file"""
comp_styles = comp_dir / (comp_name + ".styles.js")
with comp_styles.open("w") as file:
    o = 'import styled from "styled-components";\n'
    o += "\n"
    o += "export const Container = styled.div`\n"
    o += "\n"
    o += "`;\n"
    file.write(o)


"""Create Tests file"""
comp_tests = comp_dir / (comp_name + ".tests.js")
with comp_tests.open("w") as file:
    o = 'import React from "react";\n'
    o += 'import { render } from "@testing-library/react"\n'
    o += "import" + comp_name + 'from "./' + comp_name + '";\n'
    o += "\n"
    o += 'it("' + comp_name + ': renders correctly", () => {\n'
    o += (
        "  const { queryByTestId, queryByPlaceholderName } = render(<"
        + comp_name
        + "/>);"
    )
    o += "});"
    file.write(o)

os.system("code -r -g " + str(comp_js))
os.system("code -r -g " + str(comp_styles))
