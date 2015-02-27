#!/usr/bin/python

import sys

# license header file
LICENSE = 'NOTICE.comment'

# file to create
target = sys.argv[1]

# copy to new file
with open(target, 'w') as new:
    with open(LICENSE, 'r') as license:
        new.write(license.read())
        license.close()

    new.close()
