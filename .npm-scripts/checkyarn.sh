#!/usr/bin/ bash
echo "$npm_execpath" | grep -q "yarn\.js$" || (echo '⚠️ Use yarn not npm! ⚠️' && exit 1)