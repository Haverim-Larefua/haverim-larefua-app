#!/bin/bash -x

# List the blobs in an Azure storage container.
echo "usage: ${0##*/} <access-key>"


# Hard coded info
request_date=$(TZ=GMT date "+%a, %d %h %Y %H:%M:%S %Z")
authorization="IEmj/vLTqeDxoK0c29bJrz41bv//aa1EUXkD/x+WdKuwcuyUAxZntV8ycx2AJ/m5MpplHyJn+F9tG2X1qgoWkw=="
container_name="ffh"
blob_store_url="blob.core.windows.net"
storage_account="ex005adce99757d21ee15492"
storage_service_version="2011-08-18"


# Arguments
access_key="$1"


# HTTP Request headers
x_ms_date_h="x-ms-date:$request_date"
x_ms_version_h="x-ms-version:$storage_service_version"


# Build the signature string
canonicalized_headers="${x_ms_date_h}\n${x_ms_version_h}"
canonicalized_resource="/${storage_account}/${container_name}"
string_to_sign="GET\n\n\n\n\n\n\n\n\n\n\n\n${canonicalized_headers}\n${canonicalized_resource}\ncomp:list\nrestype:container"


# Decode the Base64 encoded access key, convert to Hex.
decoded_hex_key=$(echo -n "$access_key" | base64 -D | xxd -p -c256)


# Create the HMAC signature for the Authorization header
signature=$(printf "%s", "$string_to_sign" | openssl dgst -sha256 -mac HMAC -macopt "hexkey:$decoded_hex_key" -binary |  base64)
authorization_header="Authorization: $authorization $storage_account:$signature"
curl \
  -H "$x_ms_date_h" \
  -H "$x_ms_version_h" \
  -H "$authorization_header" \
  "https://${storage_account}.${blob_store_url}/${container_name}?restype=container&comp=list"
