import os
import sys
from pathlib import Path

'''Process and validate input'''
if len(sys.argv) == 1:
    print('Error: No component name given as second arguement')
    sys.exit()

page_name = sys.argv[1]
page_name = page_name[0].upper() + page_name[1:]
page_dir = Path('../src/Pages')

other_pages = []
for root, subdirs, files in os.walk(page_dir):
    for sd in subdirs:
        other_pages.append(sd)

if page_name in other_pages:
    print('Error: Page already exists')
    sys.exit()

page_dir = page_dir / page_name
page_dir.mkdir(parents=True, exist_ok=True)


'''Create Page file'''
comp_js = page_dir / (page_name + '.js')
with comp_js.open('w') as file:
    o = 'import React from "react";\n'
    o += 'import { Container } from "./' + page_name + '.styles";\n'
    o += '\n'
    o += 'function ' + page_name + '() {\n'
    o += '\n'
    o += '  return (\n'
    o += '    <>\n'
    o += '      <Container>\n'
    o += '        \n'
    o += '      </Container>\n'
    o += '    </>\n'
    o += '  );\n'
    o += '};\n'
    o += '\n'
    o += 'export default ' + page_name + ';'
    file.write(o)


'''Create styles file'''
comp_styles = page_dir / (page_name + '.styles.js')
with comp_styles.open('w') as file:
    o = 'import styled from "styled-components";\n'
    o += '\n'
    o += 'export const Container = styled.div`\n'
    o += '\n'
    o += '`;\n'
    file.write(o)

os.system('code -r -g ' + str(comp_js))
os.system('code -r -g ' + str(comp_styles))