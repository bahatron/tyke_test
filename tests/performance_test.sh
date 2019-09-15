#!/bin/bash

echo \

# test http server capacity
autocannon -c 100 server:3000/ping
