import requests
import json
import os
import re
import subprocess

currentFile = __file__
realPath = os.path.realpath(currentFile)
dirPath = os.path.dirname(realPath)
dirName = os.path.basename(dirPath)
aria2c = dirPath + "/binaries/aria2c.exe"
cookies_file = dirPath + '/cookies.txt'


def parseCookieFile(cookiefile):
    cookies = {}
    with open(cookies_file, 'r') as fp:
        for line in fp:
            if not re.match(r'^\#', line):
                lineFields = line.strip().split('\t')
                cookies[lineFields[5]] = lineFields[6]
    return cookies


cookies = parseCookieFile('cookies.txt')
print('Cookies Parsed')


urls = input('Enter the Link: ')

redirects = requests.get(url=urls)
inp = redirects.url
dom = inp.split("/")[2]
fxl = inp.split("=")
key = fxl[-1]

URL = f'https://{dom}/share/list?app_id=250528&shorturl={key}&root=1'

header = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': f'https://{dom}/sharing/link?surl={key}',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
}

resp = requests.get(url=URL, headers=header, cookies=cookies).json()[
    'list'][0]['dlink']
    
subprocess.run([aria2c, '--console-log-level=warn', '-x 16',
               '-s 16', '-j 16', '-k 1M', '--file-allocation=none', resp])
