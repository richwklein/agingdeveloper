/**
 * The page used to create the keybase.txt file.
 */
import type { APIRoute } from 'astro'

const keybaseTxt = `
==================================================================
https://keybase.io/richwklein
--------------------------------------------------------------------

I hereby claim:

  * I am an admin of https://agingdeveloper.com
  * I am richwklein (https://keybase.io/richwklein) on keybase.
  * I have a public key with fingerprint 85E1 2A77 53F4 DB22 73BA  F901 4CA8 97DF 2EC3 FD06

To do so, I am signing this object:

{
  "body": {
    "key": {
      "eldest_kid": "0120fa6d98eacbc4465c08b4db557ac474a6425b3130fa984b27e669db92ae4bde1c0a",
      "fingerprint": "85e12a7753f4db2273baf9014ca897df2ec3fd06",
      "host": "keybase.io",
      "key_id": "4ca897df2ec3fd06",
      "kid": "0101200d44960c4c966a0ea8d6b34563c2ca7fc0d6496702df2424f8e504086519e70a",
      "uid": "49e660b3128eb723e47bab39cb867719",
      "username": "richwklein"
    },
    "service": {
      "hostname": "agingdeveloper.com",
      "protocol": "https:"
    },
    "type": "web_service_binding",
    "version": 1
  },
  "ctime": 1595100771,
  "expire_in": 157680000,
  "prev": "56010b057333d30424708c16fa0329a2f9229de173916519548a43a9d0eea897",
  "seqno": 67,
  "tag": "signature"
}

which yields the signature:

-----BEGIN PGP MESSAGE-----
Version: Keybase OpenPGP v2.1.13
Comment: https://keybase.io/crypto

yMNzAnicbVJ9TJVVHL6AQDBpFBEDa7UXbNlu7P0+73sXqUMoky5jpLYgL+/HuZdX
Lve93C8Qwo+l4hgtU1Ljw0G5uiMTFpDgkgVKkgqIKAzlS4sEs4lAC0ZcOi/pf51/
zs7vPM/ze37PORfDAnShfine42PxF5aC/K6017h1pgijVISJqrwLMxRhOXBlg1YZ
Ol2mHEXGDBhOkLhZYGWeg4IkSjTNMhLOibQsMgwQJBrQAkuTjEgRFMLxHC2SALIs
L4s8KUBalCEh4QKmx8yKzQIddodicyFZjoEEKQDAUGYkRZKAEgUzjxO0JHA8kM0k
lCizjLOImK06NQYyJwpOGK+oqIYOphV7/4N/4ltzjss0zbO4REs8ywo4FDiZFSma
YSmJlARglnCZRQCAk0iCJmkzBxmcxjmWIXgIVny7/+vDo6FwNCXJQRGQFKSBKIgU
L4kcCwDBa0AndNiEXIjQDkXKzs+xQsWGFesxVPcoEtSi1WZ5jBEsKBAZeqBVtUNH
vKTmIg27Q3WpkmpF99kul91p0PiuXXaNkA9F02Mpk6jYZERHDA90OBXVhhkIhJRc
iqZNMDxD4DjypcdggV1xQJOiIRjAcjhaWh/oQZIMi2IScQZQFCVTOAoA4JxEsGYB
p0heIM08SfLoBQHFE1okDM0JNCXwMg6hljumDZdnUzEDC5BPwYI0nYrFJrjcDogV
d7RnrtL5heqCAv21j6YLDQl/8v3oiHBdxdlzlsv0S0n3GtkBY55pX3qiYXJTU/TC
XJ1vcnP2bFicF+t/FHnKu7dsPKOr7UbNP5FHuH1/nfLi1bertx4sPx5f1fmgOqn8
Kct4aXrqOc9sz8Rs1DBItY0+YA9EzIGE4Ft+3qYBbwNTFbG3QY/lJdfHfaaLqfsg
fLBu5szoi19nVi0UjjgChozdP92d/uLtrsm81Zlj9eNrrk/fuFi/MbZvbYXaQfks
5yOb52fbcmo3pdd95Vs6sXOxoCHrzIczJz5PMf3gr3+zqfHIz5xvYTV/Fp/snLlT
+vLy7oc9qWMvsJeur/0RY/pyWjNJa9S27sMVib/s7xk5NFw+ML+UHLdYssrtfNgh
9wzW767xvBJweeq+DdysPRbuXWxOP2ZnPvaB53YYW+g0d7slNqPrfq/x1w3Janpo
8TjTLDUVJZZdsgxUxk4+2nj++zcOKrOt5a9tOVlJt4RVgt9qgvWdJa/uefakq3/n
u9HW6KO9QyWb1/enCYHXelpz39s/MbLt9z9CSiMPXL3Qy4QGtuzJOv3nuq2Fr494
E9a99UzqXMNi2pLPcav69kSCBzZ+emU0ptSQ1b7h+brawdqGd+5e/Wj7+m/8t2R8
V1h/KLhYbn86Zmq5wL97SBieX5iWm93dd3pBkk13c8cnR6m+lHshbcayqaDa5Sjz
l/nfsiF/r7lW9H6rb3vaafVfcm7UBw==
=K1FS
-----END PGP MESSAGE-----

And finally, I am proving ownership of this host by posting or
appending to this document.

View my publicly-auditable identity here: https://keybase.io/richwklein

==================================================================
`.trim()

export const GET: APIRoute = () => {
  return new Response(keybaseTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
