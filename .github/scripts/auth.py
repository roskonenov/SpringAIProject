import os
import sys
import json
import base64
import re

key_data = os.environ.get("KEY_DATA", "").strip()
if not key_data:
    print("ERROR: Secret GCP_SA_KEY is empty in GitHub Repository Secrets!", file=sys.stderr)
    sys.exit(1)

data = None

# Attempt 1: Base64 decode
try:
    decoded = base64.b64decode(key_data).decode("utf-8")
    data = json.loads(decoded, strict=False)
except Exception:
    pass

# Attempt 2: Direct JSON with strict=False
if data is None:
    try:
        data = json.loads(key_data, strict=False)
    except Exception:
        pass

# Attempt 3: Regex repair of unescaped newlines
if data is None:
    try:
        fixed = re.sub(r'[\r\n]+', r'\n', key_data)
        data = json.loads(fixed, strict=False)
    except Exception as e:
        print(f"ERROR: Failed to parse GCP_SA_KEY: {e}", file=sys.stderr)
        sys.exit(1)

out_file = sys.argv[1] if len(sys.argv) > 1 else "/tmp/gcp_sa_key.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print(f"Successfully processed key for project: {data.get('project_id')}")
