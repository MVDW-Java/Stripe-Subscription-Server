#!/bin/sh
echo "Building Stripe Subscription Server..."

if [ -d "out" ]; then rm -r out; fi
mkdir -p out
cp -r config out
cp -r src/* out 
cd out

npm install > /dev/null
cd ..

# show output
echo " "
echo "-----------"
echo "Output: $(pwd)/output"