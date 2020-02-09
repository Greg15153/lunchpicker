#!/bin/bash
set +H # Disable expansion history

HOST=db
PORT=5432
USERNAME=postgres
PASSWORD='yourStrong(!)Password'
DATABASE=lunchpicker

psql "postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}" -f 0000_Create.sql
psql "postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}" -f 0001__Initalize.sql
